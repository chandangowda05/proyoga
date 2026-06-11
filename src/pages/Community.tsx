import { motion } from 'framer-motion';
import { Users, Calendar, Trophy, MessageSquare, Award, UserPlus, ExternalLink } from 'lucide-react';

export default function Community() {
  const upcomingEvents = [
    { id: 1, title: 'Morning Flow', date: 'Tomorrow, 7:00 AM', host: 'Sarah J.', attendees: 45, type: 'Live Class' },
    { id: 2, title: 'Balance Workshop', date: 'Sat, May 17, 10:00 AM', host: 'David K.', attendees: 120, type: 'Workshop' },
    { id: 3, title: 'Flexibility Session', date: 'Sun, May 18, 5:00 PM', host: 'Elena R.', attendees: 85, type: 'Live Class' },
  ];

  const leaderboard = [
    { rank: 1, name: 'Alex Rivera', points: 12450, badge: 'Advanced' },
    { rank: 2, name: 'Mila Chen', points: 11200, badge: 'Intermediate' },
    { rank: 3, name: 'Jordan Smyth', points: 10850, badge: 'Intermediate' },
    { rank: 4, name: 'Sarah Johnson', points: 9400, badge: 'Standard' },
    { rank: 5, name: 'Kenji Sato', points: 8900, badge: 'Standard' },
  ];

  const connections = [
    { name: 'Sarah J.', level: 'Coach', status: 'Online' },
    { name: 'Elena R.', level: 'Practitioner', status: 'In Session' },
    { name: 'David K.', level: 'Coach', status: 'Offline' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-display font-bold text-stone-900 mb-2 tracking-tight">Community</h1>
          <p className="text-stone-600 font-medium">Connect with others and track your progress on the leaderboard.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-white border border-stone-200 px-6 py-3 rounded-xl hover:bg-stone-50 transition-all text-sm font-bold text-stone-900 uppercase tracking-widest shadow-sm">
            <MessageSquare className="w-4 h-4" /> Global Chat
          </button>
          <button className="flex items-center gap-2 bg-green-700 text-white font-bold px-6 py-3 rounded-xl hover:bg-green-800 transition-all text-sm shadow-lg uppercase tracking-widest">
            <UserPlus className="w-4 h-4" /> Invite
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Upcoming Events - Left Side (8 cols) */}
        <div className="lg:col-span-8 space-y-12">
          
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="text-green-700 w-6 h-6" />
              <h2 className="text-2xl font-display font-bold text-stone-900 tracking-tight">Upcoming Events</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingEvents.map(event => (
                <motion.div 
                   key={event.id}
                   className="card-premium p-6 group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-green-700 bg-green-50 border border-green-100 px-3 py-1 rounded-full">
                      {event.type}
                    </span>
                    <span className="text-[10px] text-stone-500 font-bold uppercase tracking-widest flex items-center gap-2">
                      <Users className="w-3 h-3" /> {event.attendees} joined
                    </span>
                  </div>
                  <h3 className="text-xl font-display font-bold text-stone-900 mb-2 group-hover:text-green-700 transition-colors">{event.title}</h3>
                  <p className="text-sm text-stone-500 mb-6 font-medium">{event.date} • with {event.host}</p>
                  <button className="w-full py-3 bg-white border border-stone-200 rounded-xl text-xs font-bold text-stone-900 uppercase tracking-widest hover:bg-stone-50 transition-colors flex items-center justify-center gap-2 shadow-sm">
                    Join List <ExternalLink className="w-3 h-3" />
                  </button>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Connect Section */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Users className="text-green-700 w-6 h-6" />
              <h2 className="text-2xl font-display font-bold text-stone-900 tracking-tight">Connections</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {connections.map((person, i) => (
                <div key={i} className="card-premium p-6 flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-2xl bg-stone-100 mb-4 border border-stone-200 p-1 overflow-hidden">
                    <img 
                      src={`https://ui-avatars.com/api/?name=${person.name}&background=E7E5E4&color=1C1917`} 
                      alt={person.name}
                      className="w-full h-full rounded-xl grayscale hover:grayscale-0 transition-all duration-500 object-cover"
                    />
                  </div>
                  <h4 className="font-bold text-stone-900 text-lg tracking-tight mb-1">{person.name}</h4>
                  <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-4">{person.level}</p>
                  <button className="text-[10px] font-bold text-green-700 border border-green-200 px-4 py-2 rounded-full hover:bg-green-700 hover:text-white transition-all uppercase tracking-widest">
                    Connect
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Rewards Section */}
          <section className="card-premium p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-green-50 rounded-2xl text-green-700 border border-green-100">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-stone-900 tracking-tight">Milestones</h2>
                <p className="text-sm text-stone-500 font-medium">Track your progress and unlock rewards.</p>
              </div>
            </div>
            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="min-w-[120px] flex flex-col items-center gap-3 group">
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500 ${i === 1 ? 'bg-green-50 text-green-700 border border-green-200 shadow-sm' : 'bg-stone-50 text-stone-300 border border-stone-200 grayscale group-hover:grayscale-0'}`}>
                    <Trophy className="w-10 h-10" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-center text-stone-500">{i === 1 ? 'Early Access' : 'Locked'}</span>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Leaderboard - Right Side (4 cols) */}
        <div className="lg:col-span-4">
          <section className="card-premium p-0 overflow-hidden sticky top-28">
            <div className="p-6 border-b border-stone-200 bg-stone-50">
              <div className="flex items-center gap-3">
                <Trophy className="text-green-700 w-6 h-6" />
                <h2 className="text-xl font-display font-bold text-stone-900 tracking-tight">Leaderboard</h2>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {leaderboard.map(user => (
                <div key={user.rank} className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${user.rank === 4 ? 'bg-green-50 border-green-200 text-stone-900' : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'}`}>
                  <div className="flex items-center gap-4">
                    <span className={`w-6 font-display font-bold text-lg ${user.rank <= 3 ? 'text-green-700' : 'text-stone-400'}`}>{user.rank}</span>
                    <div>
                      <p className={`font-bold tracking-tight ${user.rank === 4 ? 'text-stone-900' : 'text-stone-700'}`}>{user.name} {user.rank === 4 && '(You)'}</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-stone-500">{user.badge}</p>
                    </div>
                  </div>
                  <span className="font-mono text-sm font-bold text-stone-900">{user.points.toLocaleString()}</span>
                </div>
              ))}
              <button className="w-full py-4 mt-4 text-xs font-bold text-stone-600 hover:text-stone-900 transition-colors uppercase tracking-[0.2em]">
                View Rankings
              </button>
            </div>
          </section>
        </div>

      </div>
    </div>
  );
}
