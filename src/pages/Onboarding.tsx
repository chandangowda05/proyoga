import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, 
  Ruler, 
  Weight, 
  Mail, 
  Target, 
  Activity, 
  ChevronRight, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function Onboarding() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    level: 'Beginner',
    goals: [] as string[],
    injuries: ''
  });

  const goalsList = ['Flexibility', 'Strength', 'Balance', 'Stress Relief', 'Weight Loss', 'Mindfulness'];

  const toggleGoal = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal) 
        ? prev.goals.filter(g => g !== goal) 
        : [...prev.goals, goal]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error('Please fill in your basic information');
      return;
    }
    toast.success('Profile created successfully!');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-bg-primary py-20 px-6 selection:bg-green-100">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 bg-green-700 rounded-2xl flex items-center justify-center mx-auto shadow-lg mb-6"
          >
            <Activity className="text-white w-8 h-8" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-stone-900 tracking-tight">Complete Your Profile</h1>
          <p className="text-stone-500 text-lg font-medium">Personalize your ProYoga experience for better results.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10 pb-20">
          
          {/* Section 1: Basic Info */}
          <section className="bg-white border border-stone-200 rounded-[32px] p-8 md:p-12 shadow-sm space-y-8">
            <div className="flex items-center gap-3 border-b border-stone-100 pb-6 mb-8">
              <User className="text-green-700 w-6 h-6" />
              <h2 className="text-2xl font-display font-bold text-stone-900 tracking-tight">Personal Details</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-400 uppercase tracking-widest">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-300" />
                  <input 
                    type="text" 
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full pl-12 pr-6 py-4 bg-stone-50 border border-stone-200 rounded-xl focus:border-green-700 outline-none transition-all font-medium text-stone-900"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-400 uppercase tracking-widest">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-300" />
                  <input 
                    type="email" 
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full pl-12 pr-6 py-4 bg-stone-50 border border-stone-200 rounded-xl focus:border-green-700 outline-none transition-all font-medium text-stone-900"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-400 uppercase tracking-widest">Age</label>
                <input 
                  type="number" 
                  placeholder="25"
                  value={formData.age}
                  onChange={e => setFormData({...formData, age: e.target.value})}
                  className="w-full px-6 py-4 bg-stone-50 border border-stone-200 rounded-xl focus:border-green-700 outline-none transition-all font-medium text-stone-900"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-400 uppercase tracking-widest">Gender</label>
                <select 
                  value={formData.gender}
                  onChange={e => setFormData({...formData, gender: e.target.value})}
                  className="w-full px-6 py-4 bg-stone-50 border border-stone-200 rounded-xl focus:border-green-700 outline-none transition-all font-medium text-stone-900 appearance-none"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="none">Prefer not to say</option>
                </select>
              </div>
            </div>
          </section>

          {/* Section 2: Physical Metrics */}
          <section className="bg-white border border-stone-200 rounded-[32px] p-8 md:p-12 shadow-sm space-y-8">
            <div className="flex items-center gap-3 border-b border-stone-100 pb-6 mb-8">
              <Ruler className="text-green-700 w-6 h-6" />
              <h2 className="text-2xl font-display font-bold text-stone-900 tracking-tight">Physical Metrics</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-400 uppercase tracking-widest">Height (cm)</label>
                <div className="relative">
                  <Ruler className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-300" />
                  <input 
                    type="number" 
                    placeholder="175"
                    value={formData.height}
                    onChange={e => setFormData({...formData, height: e.target.value})}
                    className="w-full pl-12 pr-6 py-4 bg-stone-50 border border-stone-200 rounded-xl focus:border-green-700 outline-none transition-all font-medium text-stone-900"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-400 uppercase tracking-widest">Weight (kg)</label>
                <div className="relative">
                  <Weight className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-300" />
                  <input 
                    type="number" 
                    placeholder="70"
                    value={formData.weight}
                    onChange={e => setFormData({...formData, weight: e.target.value})}
                    className="w-full pl-12 pr-6 py-4 bg-stone-50 border border-stone-200 rounded-xl focus:border-green-700 outline-none transition-all font-medium text-stone-900"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Yoga Level & Goals */}
          <section className="bg-white border border-stone-200 rounded-[32px] p-8 md:p-12 shadow-sm space-y-10">
            <div className="flex items-center gap-3 border-b border-stone-100 pb-6 mb-8">
              <Target className="text-green-700 w-6 h-6" />
              <h2 className="text-2xl font-display font-bold text-stone-900 tracking-tight">Practice Goals</h2>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold text-stone-400 uppercase tracking-widest">Yoga Experience Level</label>
              <div className="grid grid-cols-3 gap-4">
                {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setFormData({...formData, level})}
                    className={`py-4 rounded-xl font-bold transition-all border-2 ${formData.level === level ? 'bg-green-700 border-green-700 text-white shadow-lg' : 'bg-stone-50 border-stone-200 text-stone-500 hover:border-green-200'}`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold text-stone-400 uppercase tracking-widest">What are your goals?</label>
              <div className="flex flex-wrap gap-3">
                {goalsList.map(goal => (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => toggleGoal(goal)}
                    className={`px-6 py-3 rounded-full font-bold text-sm transition-all border-2 ${formData.goals.includes(goal) ? 'bg-green-100 border-green-700 text-green-700' : 'bg-stone-50 border-stone-200 text-stone-400 hover:border-green-200'}`}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Section 4: Injuries & Notes */}
          <section className="bg-white border border-stone-200 rounded-[32px] p-8 md:p-12 shadow-sm space-y-8">
            <div className="flex items-center gap-3 border-b border-stone-100 pb-6 mb-8">
              <ShieldAlert className="text-green-700 w-6 h-6" />
              <h2 className="text-2xl font-display font-bold text-stone-900 tracking-tight">Safety & Health</h2>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-400 uppercase tracking-widest">Existing Injuries or Conditions</label>
              <textarea 
                rows={4}
                placeholder="List any injuries (e.g., knee pain, lower back issues) so we can adjust your practice recommendations."
                value={formData.injuries}
                onChange={e => setFormData({...formData, injuries: e.target.value})}
                className="w-full px-6 py-4 bg-stone-50 border border-stone-200 rounded-xl focus:border-green-700 outline-none transition-all font-medium text-stone-900 resize-none"
              />
            </div>
          </section>

          <div className="flex items-center justify-center pt-8">
            <button 
              type="submit"
              className="bg-green-700 text-white px-16 py-6 rounded-2xl font-bold text-xl shadow-[0_20px_40px_-10px_rgba(22,101,52,0.3)] hover:bg-green-800 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-4 group"
            >
              Complete My Profile <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
