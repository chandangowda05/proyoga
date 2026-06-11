import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, ArrowRight, CheckCircle2, Shield, Heart, Wind } from 'lucide-react';

export default function Landing() {
  return (
    <div className="relative w-full min-h-screen bg-[#F5F5F4] overflow-hidden font-body selection:bg-green-100">
      
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-green-600/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-stone-300/20 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 w-full flex flex-col">
        
        {/* Navigation */}
        <nav className="w-full px-8 py-10 flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-700 rounded-2xl flex items-center justify-center shadow-md">
              <Activity className="text-white w-6 h-6" />
            </div>
            <span className="font-display font-bold text-2xl text-stone-900 tracking-tight uppercase">Yoga Life</span>
          </div>
          <div className="hidden md:flex items-center gap-10">
            <a href="#features" className="text-sm font-bold text-stone-500 hover:text-green-700 transition-colors uppercase tracking-widest">Features</a>
            <a href="#about" className="text-sm font-bold text-stone-500 hover:text-green-700 transition-colors uppercase tracking-widest">About</a>
            <Link to="/login" className="px-8 py-3 bg-green-700 text-white rounded-xl font-bold text-sm shadow-lg hover:bg-green-800 transition-all uppercase tracking-widest">
              Login
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-8 py-24 min-h-[85vh] gap-16">
          <div className="flex-1 text-left space-y-10 z-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-green-100 border border-green-200 text-green-800 text-[10px] font-bold uppercase tracking-[0.2em]"
            >
              <CheckCircle2 className="w-4 h-4" /> Your Smart Mat
            </motion.div>

            <motion.h1 
              className="text-7xl md:text-8xl lg:text-9xl font-display font-bold text-stone-900 tracking-tighter leading-[0.85]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Better <br />
              <span className="text-green-700">Yoga Poses.</span>
            </motion.h1>

            <motion.p 
              className="text-xl md:text-2xl text-stone-600 font-medium max-w-xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Yoga made simple for your home. See how you stand and move with real-time feedback from your mat.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-6 pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Link to="/login" className="bg-green-700 text-white px-12 py-6 rounded-2xl font-bold text-xl shadow-[0_15px_30px_-5px_rgba(22,101,52,0.3)] hover:bg-green-800 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 group">
                Begin Now <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="bg-white border-2 border-stone-200 text-stone-900 px-12 py-6 rounded-2xl font-bold text-xl hover:border-green-700 transition-all flex items-center justify-center">
                Watch Demo
              </button>
            </motion.div>
          </div>

          {/* Yoga Illustration Area - Properly Arranged */}
          <div className="flex-1 w-full relative mt-12 lg:mt-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(22,101,52,0.08)_0%,transparent_70%)] pointer-events-none" />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative z-10 w-full max-w-[600px]"
            >
               <img 
                 src="/hero-yoga.png" 
                 alt="Yoga Meditation" 
                 className="w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
               />
            </motion.div>
          </div>
        </main>

        {/* Simple Features */}
        <section id="features" className="w-full max-w-7xl mx-auto px-8 py-40 border-t border-stone-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            {[
              { icon: Wind, title: 'Breathe Right', desc: 'Follow simple cues to keep your breathing steady and calm.' },
              { icon: Shield, title: 'Stay Safe', desc: 'Your mat tells you if your pose needs adjustment to keep you safe.' },
              { icon: Heart, title: 'Daily Progress', desc: 'Check how many sessions you have finished and how you improve.' }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="space-y-8 group"
              >
                <div className="w-20 h-20 bg-green-50 rounded-3xl flex items-center justify-center text-green-700 border border-green-100 group-hover:scale-110 transition-transform duration-500">
                  <feature.icon className="w-10 h-10" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-display font-bold text-stone-900 tracking-tight">{feature.title}</h3>
                  <p className="text-stone-500 leading-relaxed font-medium text-lg">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full py-24 px-8 border-t border-stone-200 bg-stone-50/50">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
            <div className="space-y-6">
               <div className="flex items-center gap-3">
                  <Activity className="text-green-700 w-8 h-8" />
                  <span className="font-display font-bold text-3xl text-stone-900 tracking-tight uppercase">Yoga Life</span>
               </div>
               <p className="text-stone-500 max-w-sm font-medium leading-relaxed">
                 Simple tools for your home yoga practice. <br />
                 Designed for everyone.
               </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
              <div className="space-y-6">
                <h4 className="font-bold text-stone-900 uppercase tracking-widest text-xs">Menu</h4>
                <div className="flex flex-col gap-4 text-sm font-medium text-stone-500">
                  <a href="#" className="hover:text-green-700 transition-colors">Features</a>
                  <a href="#" className="hover:text-green-700 transition-colors">About</a>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center gap-6">
             <p className="text-stone-400 font-medium text-sm">
               &copy; 2026 Yoga Life. All rights reserved.
             </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
