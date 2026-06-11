import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, Calendar, Clock, Award, ChevronRight, Target, ActivitySquare } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock Data for Analytics
const mockAccuracyData = [
  { date: 'Mon', accuracy: 65 },
  { date: 'Tue', accuracy: 72 },
  { date: 'Wed', accuracy: 68 },
  { date: 'Thu', accuracy: 80 },
  { date: 'Fri', accuracy: 85 },
  { date: 'Sat', accuracy: 82 },
  { date: 'Sun', accuracy: 88 },
];

const mockBalanceData = [
  { date: 'Mon', stability: 70 },
  { date: 'Tue', stability: 75 },
  { date: 'Wed', stability: 82 },
  { date: 'Thu', stability: 78 },
  { date: 'Fri', stability: 86 },
  { date: 'Sat', stability: 90 },
  { date: 'Sun', stability: 92 },
];

const mockSessions = [
  { id: '1', date: 'Today, 8:00 AM', duration: '45m', avgAccuracy: 88, bestPose: 'Warrior II' },
  { id: '2', date: 'Yesterday, 6:30 PM', duration: '30m', avgAccuracy: 82, bestPose: 'Tree Pose' },
  { id: '3', date: 'May 10, 7:15 AM', duration: '60m', avgAccuracy: 79, bestPose: 'Downward Dog' },
  { id: '4', date: 'May 8, 5:00 PM', duration: '20m', avgAccuracy: 75, bestPose: 'Mountain Pose' },
];

export default function Analytics() {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('7D');

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Analytics & Progress</h1>
          <p className="text-text-secondary">Track your consistency and form improvement over time.</p>
        </div>
        
        <div className="bg-bg-elevated border border-border rounded-btn p-1 flex">
          {['7D', '30D', 'ALL'].map(range => (
            <button 
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${timeRange === range ? 'bg-accent-teal text-bg-primary shadow-glow' : 'text-text-secondary hover:text-text-primary'}`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-2">
        <StatCard icon={Calendar} label="Total Sessions" value="24" color="text-accent-blue" bgColor="bg-accent-blue/10" trend="+3 this week" />
        <StatCard icon={Clock} label="Practice Time" value="12.5h" color="text-accent-violet" bgColor="bg-accent-violet/10" trend="+1.2h this week" />
        <StatCard icon={Target} label="Avg Accuracy" value="82%" color="text-accent-teal" bgColor="bg-accent-teal/10" trend="+5% this week" />
        <StatCard icon={Award} label="Current Streak" value="5 Days" color="text-accent-orange" bgColor="bg-accent-orange/10" trend="Personal Best: 12" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Accuracy Chart */}
        <motion.div 
          className="glass-panel p-6 rounded-card border-border/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display font-semibold flex items-center gap-2 text-text-secondary">
              <TrendingUp className="w-5 h-5 text-accent-teal" /> Accuracy Trend
            </h3>
          </div>
          <div className="w-full h-64 min-h-[256px]">
            <ResponsiveContainer width="100%" height="100%" debounce={50}>
              <BarChart data={mockAccuracyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2D45" vertical={false} />
                <XAxis dataKey="date" stroke="#6B8BB8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6B8BB8" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip 
                  cursor={{ fill: '#141C2E' }}
                  contentStyle={{ backgroundColor: '#141C2E', borderColor: '#1E2D45', borderRadius: '8px' }}
                />
                <Bar dataKey="accuracy" fill="#00D4AA" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Balance Chart */}
        <motion.div 
          className="glass-panel p-6 rounded-card border-border/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display font-semibold flex items-center gap-2 text-text-secondary">
              <ActivitySquare className="w-5 h-5 text-accent-violet" /> Balance & Stability
            </h3>
          </div>
          <div className="w-full h-64 min-h-[256px]">
            <ResponsiveContainer width="100%" height="100%" debounce={50}>
              <AreaChart data={mockBalanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorStability" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7B61FF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#7B61FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2D45" vertical={false} />
                <XAxis dataKey="date" stroke="#6B8BB8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6B8BB8" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#141C2E', borderColor: '#1E2D45', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="stability" stroke="#7B61FF" strokeWidth={3} fillOpacity={1} fill="url(#colorStability)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Session History */}
      <motion.div 
        className="glass-panel p-6 rounded-card border-border/50 mt-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <h3 className="font-display font-semibold mb-6 text-text-secondary">Session History</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-3 text-sm font-medium text-text-muted uppercase tracking-wider">Date</th>
                <th className="pb-3 text-sm font-medium text-text-muted uppercase tracking-wider">Duration</th>
                <th className="pb-3 text-sm font-medium text-text-muted uppercase tracking-wider">Avg Accuracy</th>
                <th className="pb-3 text-sm font-medium text-text-muted uppercase tracking-wider">Best Pose</th>
                <th className="pb-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {mockSessions.map((session) => (
                <tr key={session.id} className="hover:bg-bg-elevated transition-colors cursor-pointer" onClick={() => navigate(`/session/${session.id}`)}>
                  <td className="py-4 text-text-primary">{session.date}</td>
                  <td className="py-4 text-text-secondary">{session.duration}</td>
                  <td className="py-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent-teal/10 text-accent-teal text-xs font-bold">
                      {session.avgAccuracy}%
                    </span>
                  </td>
                  <td className="py-4 text-text-secondary">{session.bestPose}</td>
                  <td className="py-4 text-right">
                    <ChevronRight className="w-5 h-5 text-text-muted inline-block" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

    </div>
  );
}

function StatCard({ icon: Icon, label, value, color, bgColor, trend }: { icon: any, label: string, value: string, color: string, bgColor: string, trend: string }) {
  return (
    <motion.div 
      className="glass-panel p-6 rounded-card border-border/50"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${bgColor} ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <div>
        <p className="text-text-secondary text-sm font-medium mb-1">{label}</p>
        <p className="text-3xl font-display font-bold text-text-primary mb-2">{value}</p>
        <p className="text-xs text-text-muted">{trend}</p>
      </div>
    </motion.div>
  );
}
