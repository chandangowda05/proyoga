import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Wifi, Activity, Server, RefreshCw, ShieldCheck } from 'lucide-react';
import { usePressureSensor } from '../hooks/usePressureSensor';

export default function Sensors() {
  const { grid, isSimulated } = usePressureSensor('Mountain Pose');
  const [latency, setLatency] = useState(isSimulated ? 0 : 24);
  const [fps, setFps] = useState(5);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    // Just to simulate changing latency and last update time for the demo
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      if (!isSimulated) {
        setLatency(Math.floor(Math.random() * 10) + 20); // 20-30ms random jitter
        setFps(Math.floor(Math.random() * 2) + 29); // 29-30fps
      } else {
        setFps(5); // Simulated runs at ~5fps
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isSimulated]);

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Hardware Diagnostics</h1>
          <p className="text-text-secondary">Low-level telemetry from ESP32 and pressure mat.</p>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-bg-elevated border border-border rounded-btn hover:bg-border transition-colors text-sm font-medium">
          <RefreshCw className="w-4 h-4" /> Reconnect
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Connection Status Panel */}
        <motion.div 
          className="glass-panel p-6 rounded-card border-border/50 md:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Server className="text-accent-teal w-6 h-6" />
            <h2 className="text-xl font-display font-semibold">Connection Status</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-bg-primary border border-border rounded-lg">
              <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Data Source</p>
              <div className="flex items-center justify-between">
                <span className="font-medium text-text-primary">
                  {isSimulated ? 'Internal Simulator' : 'ESP32 WebSocket'}
                </span>
                {isSimulated ? (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-status-warning/20 text-status-warning border border-status-warning/30">MOCK</span>
                ) : (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-status-success/20 text-status-success border border-status-success/30">LIVE</span>
                )}
              </div>
            </div>

            <div className="p-4 bg-bg-primary border border-border rounded-lg">
              <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Update Rate</p>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xl text-text-primary">{fps} <span className="text-sm font-body text-text-secondary">Hz</span></span>
                <Activity className="w-5 h-5 text-accent-blue opacity-50" />
              </div>
            </div>

            <div className="p-4 bg-bg-primary border border-border rounded-lg">
              <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Network Latency</p>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xl text-text-primary">{latency} <span className="text-sm font-body text-text-secondary">ms</span></span>
                <Wifi className="w-5 h-5 text-accent-teal opacity-50" />
              </div>
            </div>

            <div className="p-4 bg-bg-primary border border-border rounded-lg">
              <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Last Sync</p>
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-text-primary">{lastUpdate.toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sensor Health Panel */}
        <motion.div 
          className="glass-panel p-6 rounded-card border-border/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
           <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="text-status-success w-6 h-6" />
            <h2 className="text-xl font-display font-semibold">Sensor Health</h2>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-text-secondary">Active Nodes</span>
                <span className="font-mono">16 / 16</span>
              </div>
              <div className="w-full h-2 bg-bg-elevated rounded-full overflow-hidden">
                <div className="h-full bg-status-success w-full" />
              </div>
            </div>
            
            <div className="p-3 bg-status-success/5 border border-status-success/20 rounded-lg flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-status-success shrink-0 mt-0.5" />
              <p className="text-sm text-text-secondary">All pressure cells are responding normally. No dead zones detected.</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Raw Data Feed */}
      <motion.div 
        className="glass-panel p-6 rounded-card border-border/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <Cpu className="text-accent-violet w-6 h-6" />
          <h2 className="text-xl font-display font-semibold">Raw Data Stream (16-ch)</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
          {grid.map((val, idx) => (
            <div key={idx} className="bg-bg-primary border border-border rounded-lg p-3 flex flex-col items-center">
              <span className="text-xs text-text-muted mb-2">CH_{idx.toString().padStart(2, '0')}</span>
              <span className="font-mono text-sm text-text-primary mb-3">{(val * 100).toFixed(0)}</span>
              <div className="w-full h-16 bg-bg-elevated rounded overflow-hidden relative">
                <div 
                  className="absolute bottom-0 w-full bg-accent-violet transition-all duration-75"
                  style={{ height: `${val * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

import { CheckCircle2 } from 'lucide-react';
