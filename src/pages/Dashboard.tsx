import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Activity, 
  Play, 
  Award, 
  Clock, 
  Target, 
  Video, 
  ChevronRight, 
  History,
  Zap,
  Layout,
  Calendar
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = {
    totalSessions: 42,
    todaySessions: 2,
    avgAccuracy: 84,
    streakDays: 5
  };

  const recentSessions = [
    { id: '1', date: 'Today, 8:00 AM', duration: '45 min', accuracy: 88, pose: 'Warrior Pose' },
    { id: '2', date: 'Yesterday, 6:30 PM', duration: '30 min', accuracy: 82, pose: 'Tree Pose' },
    { id: '3', date: 'May 11, 5:45 PM', duration: '20 min', accuracy: 79, pose: 'Dog Pose' },
  ];

  return (
    <div className="space-y-12 pb-20">
      
      {/* Header section - Clean & Simple */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-stone-200 pb-10">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full border border-green-100">
              <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
              <p className="text-[10px] font-bold text-green-700 uppercase tracking-widest">
                Active
              </p>
            </div>
            <div className="flex items-center gap-2 text-stone-400 font-bold text-[10px] uppercase tracking-widest">
              <Calendar className="w-3 h-3" />
              {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </div>
            <div className="flex items-center gap-2 text-stone-400 font-bold text-[10px] uppercase tracking-widest border-l border-stone-200 pl-4">
              <Clock className="w-3 h-3" />
              {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-bold text-stone-900 tracking-tight">
            Welcome back, {currentUser?.displayName?.split(' ')[0] || 'User'}
          </h1>
          <p className="text-stone-600 font-medium text-lg max-w-xl leading-relaxed">
            Check your sessions and how you are doing today.
          </p>
        </div>
        <button 
          onClick={() => navigate('/pose-detection')}
          className="bg-green-700 text-white px-12 py-6 rounded-2xl font-bold text-xl shadow-[0_15px_30px_-10px_rgba(22,101,52,0.4)] hover:bg-green-800 active:scale-95 transition-all flex items-center justify-center gap-4 shrink-0 group"
        >
          <Play className="w-6 h-6 fill-current group-hover:scale-110 transition-transform" />
          Begin Yoga
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Simple Stats Grid */}
        <div className="md:col-span-12 grid grid-cols-1 sm:grid-cols-4 gap-8">
          {[
            { icon: History, label: 'All Sessions', value: stats.totalSessions, unit: 'Sessions', color: 'text-stone-700', bg: 'bg-stone-50' },
            { icon: Award, label: 'Yoga Streak', value: stats.streakDays, unit: 'Days', color: 'text-green-700', bg: 'bg-green-50' },
            { icon: Target, label: 'Pose Score', value: stats.avgAccuracy, unit: '%', color: 'text-stone-700', bg: 'bg-stone-50' },
            { icon: Zap, label: 'Activity Points', value: '1,240', unit: 'XP', color: 'text-stone-700', bg: 'bg-stone-50' },
          ].map((item, i) => (
            <motion.div 
              key={i}
              className="bg-white border border-stone-200 p-8 rounded-[32px] shadow-sm flex flex-col justify-between hover:border-green-200 transition-all group"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className={`w-14 h-14 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center border border-stone-100 mb-6 group-hover:scale-105 transition-transform`}>
                <item.icon className="w-7 h-7" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">{item.label}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-display font-bold text-stone-900 tracking-tight">{item.value}</span>
                  <span className="text-xs font-bold text-stone-500">{item.unit}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Activity Log (Span 8) */}
        <motion.div 
          className="bg-white border border-stone-200 p-10 md:col-span-8 rounded-[32px] shadow-sm"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <History className="text-green-700 w-6 h-6" />
              <h2 className="text-2xl font-display font-bold text-stone-900 tracking-tight">Your Practice History</h2>
            </div>
            <button onClick={() => navigate('/analytics')} className="text-sm font-bold text-green-700 hover:text-green-800 transition-all uppercase tracking-widest">
              See All
            </button>
          </div>
          
          <div className="space-y-4">
            {recentSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-6 bg-stone-50/50 border border-stone-100 rounded-[24px] hover:border-green-200 hover:bg-white transition-all cursor-pointer group shadow-sm" onClick={() => navigate(`/session/${session.id}`)}>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-stone-400 group-hover:text-green-700 group-hover:border-green-100 transition-all">
                    <Activity className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 text-lg tracking-tight">{session.pose}</h3>
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-1">{session.date} • {session.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="text-2xl font-display font-bold text-stone-900 tracking-tight">
                      {session.accuracy}%
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-stone-300 group-hover:text-green-700 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Sidebar Widgets (Span 4) */}
        <div className="md:col-span-4 space-y-8">
          
          {/* Mat Status */}
          <motion.div 
            className="bg-white border border-stone-200 p-8 rounded-[32px] shadow-sm"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-xl font-display font-bold text-stone-900 tracking-tight mb-8">Equipment</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl border border-stone-100">
                <div className="flex items-center gap-3">
                  <Cpu className="w-5 h-5 text-green-700" />
                  <span className="text-sm font-bold text-stone-800">Your Mat</span>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
              </div>
              <div className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl border border-stone-100">
                <div className="flex items-center gap-3">
                  <Video className="w-5 h-5 text-green-700" />
                  <span className="text-sm font-bold text-stone-800">Pose Camera</span>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
              </div>
              <div className="pt-4 border-t border-stone-100">
                <div className="flex items-center justify-between text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-3">
                  <span>Mat Battery</span>
                  <span className="text-stone-900 font-bold">88%</span>
                </div>
                <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-600 w-[88%] rounded-full shadow-sm"></div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Balance Preview */}
          <motion.div 
            className="bg-green-700 p-8 rounded-[32px] shadow-[0_20px_40px_-15px_rgba(22,101,52,0.4)] text-white overflow-hidden relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="absolute top-[-20%] right-[-20%] w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <h2 className="text-xl font-display font-bold mb-6 flex items-center gap-3">
              <Layout className="w-5 h-5 opacity-50" /> Live Balance
            </h2>
            <div className="aspect-square w-full rounded-full border-2 border-white/20 relative flex items-center justify-center bg-white/5 backdrop-blur-md">
               <div className="absolute inset-8 rounded-full border border-white/10" />
               <div className="absolute inset-16 rounded-full border border-white/10" />
               <motion.div 
                 animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                 transition={{ duration: 2, repeat: Infinity }}
                 className="w-8 h-8 bg-white rounded-full shadow-[0_0_25px_rgba(255,255,255,0.8)]" 
               />
            </div>
            <p className="text-center mt-8 text-sm font-bold uppercase tracking-widest text-green-100">Perfectly Balanced</p>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
