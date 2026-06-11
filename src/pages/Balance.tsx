import { useEffect, useRef, useState } from 'react';
import { usePressureSensor } from '../hooks/usePressureSensor';
import { motion } from 'framer-motion';
import { ActivitySquare, TrendingUp, Target } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Balance() {
  const { copX, copY, totalWeight } = usePressureSensor('Tree Pose');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [history, setHistory] = useState<{time: string, score: number}[]>([]);
  const [stabilityScore, setStabilityScore] = useState(100);

  // Manage CoP visualization and stability score
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw fading trail
    ctx.fillStyle = 'rgba(8, 11, 16, 0.1)'; // bg-primary with opacity for fade effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw center crosshair
    ctx.strokeStyle = 'rgba(30, 45, 69, 0.5)'; // border color
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();

    if (totalWeight > 0) {
      // Map copX/copY (-1 to 1) to canvas coordinates (0 to 300)
      // Note: Invert Y so positive is up
      const cx = (copX + 1) * (canvas.width / 2);
      const cy = (-copY + 1) * (canvas.height / 2);

      // Draw current CoP dot
      ctx.beginPath();
      ctx.arc(cx, cy, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#00D4AA';
      ctx.shadowColor = '#00D4AA';
      ctx.shadowBlur = 15;
      ctx.fill();
      ctx.shadowBlur = 0; // reset
    }

    // Calculate a simple stability score based on distance from center
    // In a real app, this would use variance over time
    const dist = Math.sqrt(copX * copX + copY * copY);
    const score = Math.max(0, Math.min(100, Math.round(100 - (dist * 100))));
    setStabilityScore(score);

  }, [copX, copY, totalWeight]);

  // Manage history chart data
  useEffect(() => {
    const interval = setInterval(() => {
      setHistory(prev => {
        const now = new Date();
        const timeStr = `${now.getMinutes()}:${now.getSeconds().toString().padStart(2, '0')}`;
        const newHist = [...prev, { time: timeStr, score: stabilityScore }];
        if (newHist.length > 20) newHist.shift();
        return newHist;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [stabilityScore]);

  return (
    <div className="flex flex-col h-full gap-6 max-w-6xl mx-auto pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Balance & Stability</h1>
          <p className="text-text-secondary">Center of Pressure (CoP) tracking and stability scoring.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: CoP Visualization */}
        <div className="lg:col-span-1 glass-panel p-6 rounded-card border border-border/50 flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-6">
            <h3 className="font-display font-semibold flex items-center gap-2">
              <Target className="w-5 h-5 text-accent-teal" /> Center of Pressure
            </h3>
          </div>

          <div className="relative border-2 border-bg-elevated rounded-xl bg-bg-primary overflow-hidden shadow-inner mb-6">
            <canvas 
              ref={canvasRef}
              width={300}
              height={300}
              className="block"
            />
            {/* Overlay Grid lines for UI */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] text-text-muted font-mono">FRONT</div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-text-muted font-mono">BACK</div>
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] text-text-muted font-mono -rotate-90">LEFT</div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-text-muted font-mono rotate-90">RIGHT</div>
          </div>

          <div className="w-full space-y-4">
            <div>
              <div className="flex justify-between text-xs text-text-secondary mb-1">
                <span>Lateral Shift (X)</span>
                <span className="font-mono text-text-primary">{copX > 0 ? '+' : ''}{(copX * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full h-1.5 bg-bg-elevated rounded-full overflow-hidden relative">
                <div 
                  className="absolute top-0 bottom-0 bg-accent-blue transition-all duration-100" 
                  style={{ left: '50%', width: `${Math.abs(copX * 50)}%`, transform: copX < 0 ? 'translateX(-100%)' : 'none' }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs text-text-secondary mb-1">
                <span>Sagittal Shift (Y)</span>
                <span className="font-mono text-text-primary">{copY > 0 ? '+' : ''}{(copY * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full h-1.5 bg-bg-elevated rounded-full overflow-hidden relative">
                <div 
                  className="absolute top-0 bottom-0 bg-accent-violet transition-all duration-100" 
                  style={{ left: '50%', width: `${Math.abs(copY * 50)}%`, transform: copY < 0 ? 'translateX(-100%)' : 'none' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Score & Charts */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Stability Gauge */}
            <motion.div 
              className="glass-panel p-6 rounded-card border border-border/50 flex flex-col items-center justify-center relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="absolute top-4 left-4">
                <h3 className="font-display font-semibold text-text-secondary flex items-center gap-2">
                  <ActivitySquare className="w-5 h-5" /> Stability Score
                </h3>
              </div>

              <div className="relative w-48 h-48 mt-8 flex items-center justify-center">
                {/* SVG Radial Gauge */}
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                  <circle 
                    cx="50" cy="50" r="40" 
                    fill="transparent" 
                    stroke="var(--tw-colors-bg-elevated)" 
                    strokeWidth="8" 
                  />
                  <circle 
                    cx="50" cy="50" r="40" 
                    fill="transparent" 
                    stroke={stabilityScore > 80 ? 'var(--tw-colors-status-success)' : stabilityScore > 50 ? 'var(--tw-colors-status-warning)' : 'var(--tw-colors-status-danger)'}
                    strokeWidth="8" 
                    strokeDasharray="251.2" 
                    strokeDashoffset={251.2 - (251.2 * stabilityScore) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-500 ease-out"
                    style={{ filter: `drop-shadow(0 0 8px ${stabilityScore > 80 ? 'var(--tw-colors-status-success)' : 'var(--tw-colors-status-warning)'})` }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-display font-bold text-text-primary">{stabilityScore}</span>
                  <span className="text-xs font-medium text-text-muted mt-1 uppercase tracking-wider">Out of 100</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Tips */}
            <motion.div 
              className="glass-panel p-6 rounded-card border border-border/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h3 className="font-display font-semibold mb-4 text-text-secondary">Real-Time Insights</h3>
              <div className="space-y-4">
                <div className="p-4 bg-accent-teal/10 border border-accent-teal/20 rounded-lg">
                  <p className="text-sm text-text-primary">
                    <span className="font-bold text-accent-teal">Focus:</span> Your weight is slightly favoring your right side. Try to distribute weight evenly across both feet.
                  </p>
                </div>
                <div className="p-4 bg-bg-elevated border border-border rounded-lg">
                  <p className="text-sm text-text-secondary">
                    <span className="font-bold text-text-primary">Micro-adjustments:</span> Engage your core to minimize sagittal sway (front-to-back movement).
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Historical Chart */}
          <motion.div 
            className="glass-panel p-6 rounded-card border border-border/50 flex-1 min-h-[250px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-semibold flex items-center gap-2 text-text-secondary">
                <TrendingUp className="w-5 h-5" /> Session Stability Trend
              </h3>
            </div>
            <div className="w-full h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={history}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E2D45" vertical={false} />
                  <XAxis dataKey="time" stroke="#6B8BB8" fontSize={12} tickMargin={10} minTickGap={20} />
                  <YAxis domain={[0, 100]} stroke="#6B8BB8" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#141C2E', borderColor: '#1E2D45', borderRadius: '8px' }}
                    itemStyle={{ color: '#00D4AA' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#00D4AA" 
                    strokeWidth={3} 
                    dot={false}
                    activeDot={{ r: 6, fill: '#00D4AA', stroke: '#080B10', strokeWidth: 2 }}
                    animationDuration={300}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
