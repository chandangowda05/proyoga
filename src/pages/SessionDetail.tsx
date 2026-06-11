import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Target, ActivitySquare, Award } from 'lucide-react';

export default function SessionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data for the specific session
  const session = {
    id,
    date: 'Today, 8:00 AM',
    duration: '45m 20s',
    avgAccuracy: 88,
    avgBalance: 76,
    bestPose: 'Warrior II',
    totalPoses: 12,
    feedbackGiven: 5,
    poses: [
      { name: 'Downward Dog', duration: '5m', accuracy: 92 },
      { name: 'Warrior II', duration: '8m', accuracy: 89 },
      { name: 'Tree Pose', duration: '4m', accuracy: 75 },
    ]
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-8">
      <button 
        onClick={() => navigate('/analytics')}
        className="flex items-center gap-2 text-text-secondary hover:text-accent-teal transition-colors mb-4"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Analytics
      </button>

      <div>
        <h1 className="text-3xl font-display font-bold mb-2">Session Overview</h1>
        <p className="text-text-secondary">{session.date}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-panel p-6 rounded-card border-border/50">
          <div className="flex items-center gap-3 mb-2 text-text-secondary">
            <Clock className="w-5 h-5" />
            <span className="font-medium">Duration</span>
          </div>
          <p className="text-2xl font-mono text-text-primary">{session.duration}</p>
        </div>
        
        <div className="glass-panel p-6 rounded-card border-border/50">
          <div className="flex items-center gap-3 mb-2 text-text-secondary">
            <Target className="w-5 h-5" />
            <span className="font-medium">Avg Accuracy</span>
          </div>
          <p className="text-2xl font-mono text-accent-teal">{session.avgAccuracy}%</p>
        </div>

        <div className="glass-panel p-6 rounded-card border-border/50">
          <div className="flex items-center gap-3 mb-2 text-text-secondary">
            <ActivitySquare className="w-5 h-5" />
            <span className="font-medium">Avg Balance</span>
          </div>
          <p className="text-2xl font-mono text-accent-violet">{session.avgBalance}%</p>
        </div>

        <div className="glass-panel p-6 rounded-card border-border/50">
          <div className="flex items-center gap-3 mb-2 text-text-secondary">
            <Award className="w-5 h-5" />
            <span className="font-medium">Best Pose</span>
          </div>
          <p className="text-xl font-display font-bold text-accent-orange truncate">{session.bestPose}</p>
        </div>
      </div>

      <motion.div 
        className="glass-panel p-6 rounded-card border-border/50 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="font-display font-semibold mb-6 text-text-secondary">Poses Practiced</h3>
        <div className="space-y-4">
          {session.poses.map((pose, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-bg-primary rounded-btn border border-border">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                <span className="font-bold text-text-primary">{pose.name}</span>
                <span className="text-sm text-text-secondary flex items-center gap-1"><Clock className="w-3 h-3" /> {pose.duration}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-24 h-2 bg-bg-elevated rounded-full overflow-hidden hidden sm:block">
                  <div className="h-full bg-accent-teal" style={{ width: `${pose.accuracy}%` }} />
                </div>
                <span className="font-mono text-accent-teal font-bold w-12 text-right">{pose.accuracy}%</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
