import { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, MessageSquare, Settings, Play } from 'lucide-react';
import { useFeedback } from '../hooks/useFeedback';
import { evaluatePose } from '../utils/poseEvaluator';

export default function Feedback() {
  const { feedbackQueue, triggerFeedback, voiceEnabled, toggleVoice } = useFeedback();
  const [testMode, setTestMode] = useState(false);

  // Demo function to trigger mock feedback
  const runTestScenario = (scenario: string) => {
    setTestMode(true);
    let mockAngles: any;

    if (scenario === 'perfect') {
      mockAngles = { leftKnee: 90, rightKnee: 180, leftElbow: 180, rightElbow: 180, leftHip: 90, rightHip: 180, shoulderAlignment: 0 };
    } else if (scenario === 'bad_knee') {
      mockAngles = { leftKnee: 140, rightKnee: 180, leftElbow: 180, rightElbow: 180, leftHip: 90, rightHip: 180, shoulderAlignment: 0 };
    } else if (scenario === 'bad_shoulders') {
      mockAngles = { leftKnee: 90, rightKnee: 180, leftElbow: 180, rightElbow: 180, leftHip: 90, rightHip: 180, shoulderAlignment: 25 };
    }

    const result = evaluatePose('Warrior II', mockAngles);
    
    // Add a slight delay to feel like a real evaluation
    setTimeout(() => {
      if (result.corrections.length > 0) {
        triggerFeedback(result.corrections);
      } else {
        triggerFeedback([{ joint: 'Overall', message: 'Perfect form, hold it right there.', severity: 'warning' }]);
      }
      setTimeout(() => setTestMode(false), 500);
    }, 300);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold mb-2">Smart Feedback</h1>
        <p className="text-text-secondary">Configure audio and visual cues for posture correction.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Settings Panel */}
        <motion.div 
          className="glass-panel p-6 rounded-card border-border/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Settings className="text-accent-teal w-6 h-6" />
            <h2 className="text-xl font-display font-semibold">Feedback Settings</h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-bg-primary rounded-btn border border-border">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${voiceEnabled ? 'bg-accent-teal/10 text-accent-teal' : 'bg-bg-elevated text-text-muted'}`}>
                  {voiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="font-medium">Voice Coach</h3>
                  <p className="text-xs text-text-secondary">Spoken corrections during practice</p>
                </div>
              </div>
              <button 
                onClick={toggleVoice}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${voiceEnabled ? 'bg-accent-teal' : 'bg-bg-elevated border border-border'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${voiceEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-bg-primary rounded-btn border border-border opacity-50 cursor-not-allowed">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-bg-elevated text-text-muted">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium">Haptic Feedback (Mat)</h3>
                  <p className="text-xs text-text-secondary">Vibration cues from smart mat</p>
                </div>
              </div>
              <button disabled className="relative inline-flex h-6 w-11 items-center rounded-full bg-bg-elevated border border-border">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
              </button>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-medium text-text-secondary mb-4 uppercase tracking-wider">Test Scenarios</h3>
            <div className="space-y-3">
              <button 
                onClick={() => runTestScenario('perfect')}
                disabled={testMode}
                className="w-full flex items-center justify-between p-3 bg-bg-primary hover:bg-bg-elevated border border-border hover:border-accent-teal/50 rounded-btn transition-colors text-left"
              >
                <span>Perfect Form (Warrior II)</span>
                <Play className="w-4 h-4 text-text-secondary" />
              </button>
              <button 
                onClick={() => runTestScenario('bad_knee')}
                disabled={testMode}
                className="w-full flex items-center justify-between p-3 bg-bg-primary hover:bg-bg-elevated border border-border hover:border-status-warning/50 rounded-btn transition-colors text-left"
              >
                <span>Incorrect Knee Angle</span>
                <Play className="w-4 h-4 text-text-secondary" />
              </button>
              <button 
                onClick={() => runTestScenario('bad_shoulders')}
                disabled={testMode}
                className="w-full flex items-center justify-between p-3 bg-bg-primary hover:bg-bg-elevated border border-border hover:border-status-danger/50 rounded-btn transition-colors text-left"
              >
                <span>Misaligned Shoulders</span>
                <Play className="w-4 h-4 text-text-secondary" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Live Feedback Log */}
        <motion.div 
          className="glass-panel p-6 rounded-card border-border/50 flex flex-col h-[500px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <MessageSquare className="text-accent-blue w-6 h-6" />
            <h2 className="text-xl font-display font-semibold">Feedback Log</h2>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pr-2">
            {feedbackQueue.length === 0 ? (
              <div className="h-full flex items-center justify-center text-text-muted italic text-sm">
                No feedback recorded yet. Start a session or run a test scenario.
              </div>
            ) : (
              feedbackQueue.map((item, i) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`p-4 rounded-btn border ${i === 0 ? 'bg-accent-teal/10 border-accent-teal/30 shadow-glow' : 'bg-bg-primary border-border opacity-70'}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] text-text-secondary uppercase tracking-wider">{item.timestamp.toLocaleTimeString()}</span>
                    {i === 0 && <span className="flex h-2 w-2 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-teal opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-accent-teal"></span></span>}
                  </div>
                  <p className="text-sm font-medium">{item.message}</p>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
