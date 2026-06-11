import { usePressureSensor } from '../hooks/usePressureSensor';
import { motion } from 'framer-motion';
import { Grid, Cpu, AlertTriangle } from 'lucide-react';

export default function Pressure() {
  const { grid, totalWeight, isSimulated } = usePressureSensor('Warrior II'); // Defaulting to a pose with spread weight for demo

  // Function to map 0-1 pressure value to a color gradient (blue -> cyan -> green -> yellow -> red)
  const getCellColor = (value: number) => {
    if (value < 0.1) return 'rgb(14, 20, 32)'; // Base background
    if (value < 0.3) return 'rgb(0, 180, 255)'; // Blue
    if (value < 0.5) return 'rgb(0, 212, 170)'; // Teal
    if (value < 0.7) return 'rgb(0, 230, 118)'; // Green
    if (value < 0.9) return 'rgb(255, 188, 5)'; // Yellow
    return 'rgb(255, 59, 92)'; // Red
  };

  return (
    <div className="flex flex-col h-full gap-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Pressure Heatmap</h1>
          <p className="text-text-secondary">Real-time weight distribution analysis.</p>
        </div>
        
        {isSimulated ? (
          <div className="flex items-center gap-2 bg-status-warning/10 border border-status-warning/30 px-4 py-2 rounded-pill text-status-warning text-sm font-medium">
            <AlertTriangle className="w-4 h-4" />
            Simulation Mode Active
          </div>
        ) : (
          <div className="flex items-center gap-2 bg-status-success/10 border border-status-success/30 px-4 py-2 rounded-pill text-status-success text-sm font-medium">
            <Cpu className="w-4 h-4" />
            Sensor Live
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mt-4">
        {/* Heatmap Grid */}
        <div className="w-full lg:w-2/3 glass-panel p-8 rounded-card flex flex-col items-center justify-center border-border/50 shadow-2xl relative">
          
          {/* Mat boundaries indicators */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xs font-medium text-text-muted tracking-widest uppercase">Front of Mat</div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-medium text-text-muted tracking-widest uppercase">Back of Mat</div>
          
          <div className="w-full max-w-md aspect-[3/4] border-4 border-bg-elevated rounded-xl p-2 relative">
            <div className="grid grid-cols-4 grid-rows-4 gap-2 h-full w-full">
              {grid.map((value, index) => (
                <div 
                  key={index}
                  className="rounded-lg transition-colors duration-200 ease-in-out border border-bg-elevated shadow-inner"
                  style={{ 
                    backgroundColor: getCellColor(value),
                    boxShadow: value > 0.3 ? `0 0 ${value * 20}px ${getCellColor(value)}` : 'none'
                  }}
                >
                  {/* Optional: show raw value on hover or always if debugging */}
                  {/* <span className="text-[10px] text-white mix-blend-difference opacity-50 m-1">{value.toFixed(2)}</span> */}
                </div>
              ))}
            </div>
            
            {/* Outline overlay to look like a yoga mat */}
            <div className="absolute inset-0 pointer-events-none border border-border/20 rounded-xl"></div>
          </div>
        </div>

        {/* Analytics Panel */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          <motion.div 
            className="glass-panel p-6 rounded-card border border-border/50"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Grid className="text-accent-teal w-6 h-6" />
              <h3 className="text-xl font-display font-semibold">Distribution Stats</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <p className="text-sm text-text-secondary mb-1">Total Pressure Index</p>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-mono text-text-primary">{totalWeight.toFixed(1)}</span>
                  <span className="text-sm text-text-muted mb-1 pb-1">kgf</span>
                </div>
              </div>

              <div>
                <p className="text-sm text-text-secondary mb-2">Weight Balance (L/R)</p>
                <div className="w-full h-3 bg-bg-elevated rounded-full relative overflow-hidden">
                  <div className="absolute top-0 left-0 bottom-0 bg-accent-blue transition-all" style={{ width: '45%' }} />
                  <div className="absolute top-0 right-0 bottom-0 bg-accent-violet transition-all" style={{ width: '55%' }} />
                  <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-text-primary z-10" />
                </div>
                <div className="flex justify-between mt-1 text-xs text-text-muted font-medium">
                  <span>Left (45%)</span>
                  <span>Right (55%)</span>
                </div>
              </div>

              <div>
                <p className="text-sm text-text-secondary mb-2">Weight Balance (F/B)</p>
                <div className="w-full h-3 bg-bg-elevated rounded-full relative overflow-hidden">
                  <div className="absolute top-0 left-0 bottom-0 bg-accent-teal transition-all" style={{ width: '30%' }} />
                  <div className="absolute top-0 right-0 bottom-0 bg-accent-orange transition-all" style={{ width: '70%' }} />
                  <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-text-primary z-10" />
                </div>
                <div className="flex justify-between mt-1 text-xs text-text-muted font-medium">
                  <span>Front (30%)</span>
                  <span>Back (70%)</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Color Legend */}
          <motion.div 
            className="glass-panel p-6 rounded-card border border-border/50 flex-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h4 className="text-sm font-medium text-text-secondary mb-4 uppercase tracking-wider">Intensity Legend</h4>
            <div className="space-y-3">
              {[
                { color: 'bg-[#FF3B5C]', label: 'Critical / High Pressure' },
                { color: 'bg-[#FFBC05]', label: 'Elevated Pressure' },
                { color: 'bg-[#00E676]', label: 'Optimal Load' },
                { color: 'bg-[#00D4AA]', label: 'Light Contact' },
                { color: 'bg-[#0EB4FF]', label: 'Minimal Contact' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-sm ${item.color} shadow-glow`} />
                  <span className="text-sm text-text-primary">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
