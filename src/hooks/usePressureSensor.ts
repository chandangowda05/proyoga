import { useState, useEffect } from 'react';
import { generateMockGrid } from '../utils/mockSensor';

export function usePressureSensor(pose = 'Mountain Pose') {
  const [grid, setGrid] = useState<number[]>(new Array(16).fill(0));
  const [totalWeight, setTotalWeight] = useState(0);
  const [cop, setCop] = useState({ x: 0, y: 0 }); // Center of Pressure
  const [isSimulated, setIsSimulated] = useState(true);

  useEffect(() => {
    let animationFrameId: number;
    let ws: WebSocket | null = null;
    const wsUrl = import.meta.env.VITE_ESP32_WS_URL;

    if (wsUrl) {
      try {
        ws = new WebSocket(wsUrl);
        ws.onopen = () => setIsSimulated(false);
        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.grid && data.grid.length === 16) {
              setGrid(data.grid);
              calculateMetrics(data.grid);
            }
          } catch (e) {
            console.error("Failed to parse sensor data");
          }
        };
        ws.onerror = () => setIsSimulated(true);
        ws.onclose = () => setIsSimulated(true);
      } catch (e) {
        setIsSimulated(true);
      }
    }

    const calculateMetrics = (currentGrid: number[]) => {
      // Calculate total weight
      const weight = currentGrid.reduce((sum, val) => sum + val, 0);
      setTotalWeight(Math.round(weight * 100) / 100);

      // Calculate Center of Pressure (CoP)
      if (weight > 0) {
        let xSum = 0;
        let ySum = 0;
        for (let i = 0; i < 16; i++) {
          const col = i % 4;
          const row = Math.floor(i / 4);
          xSum += currentGrid[i] * col;
          ySum += currentGrid[i] * row;
        }
        // Normalize CoP to -1 to 1 range
        const copX = ((xSum / weight) / 3) * 2 - 1;
        const copY = ((ySum / weight) / 3) * 2 - 1;
        
        setCop({ x: copX, y: copY });
      } else {
        setCop({ x: 0, y: 0 });
      }
    };

    // Simulation fallback
    const updateSimulatedData = (time: number) => {
      if (isSimulated) {
        const newGrid = generateMockGrid(time, pose);
        setGrid(newGrid);
        calculateMetrics(newGrid);
      }
      // Update at roughly 200ms intervals (5 FPS)
      // requestAnimationFrame runs at 60fps, so we throttle
      setTimeout(() => {
        animationFrameId = requestAnimationFrame(updateSimulatedData);
      }, 200);
    };

    if (isSimulated) {
      animationFrameId = requestAnimationFrame(updateSimulatedData);
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (ws) ws.close();
    };
  }, [pose, isSimulated]);

  return { grid, totalWeight, copX: cop.x, copY: cop.y, isSimulated };
}
