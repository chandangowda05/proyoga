import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, Plus, Edit2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  // Mock Netflix-style profiles
  const profiles = [
    { id: 1, name: 'Alex', type: 'owner', image: 'https://ui-avatars.com/api/?name=Alex&background=E7E5E4&color=1C1917' },
    { id: 2, name: 'Sarah', type: 'user', image: 'https://ui-avatars.com/api/?name=Sarah&background=F5F5F4&color=15803D' },
    { id: 3, name: 'Guest', type: 'guest', image: 'https://ui-avatars.com/api/?name=Guest&background=FAFAF9&color=A8A29E' },
  ];

  const handleProfileSelect = async (profile: any) => {
    if (isEditing) return;
    
    const loadingToast = toast.loading(`Logging in as ${profile.name}...`);
    try {
      // Attempt auto-login for demo purposes
      await login('demo@pro.com', 'password');
      toast.success(`Welcome back, ${profile.name}!`, { id: loadingToast });
      navigate('/onboarding');
    } catch (error) {
      console.error("Login failed:", error);
      // Fallback for demo: if firebase isn't configured, still allow access to onboarding
      toast.error('Authentication failed, but proceeding to demo...', { id: loadingToast, duration: 3000 });
      setTimeout(() => navigate('/onboarding'), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center p-6 selection:bg-green-100">
      <div className="w-full max-w-4xl flex flex-col items-center">
        
        {/* Branding */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-16"
        >
          <div className="w-10 h-10 bg-green-700 rounded-xl flex items-center justify-center shadow-md">
            <Activity className="text-white w-6 h-6" />
          </div>
          <span className="font-display font-bold text-2xl text-stone-900 tracking-tight uppercase">Yoga Life</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-4xl md:text-5xl font-display font-bold text-stone-900 mb-12 tracking-tight text-center"
        >
          Select User Profile
        </motion.h1>

        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {profiles.map((profile, i) => (
            <motion.div
              key={profile.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center group cursor-pointer"
              onClick={() => handleProfileSelect(profile)}
            >
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl overflow-hidden border-4 border-transparent group-hover:border-green-600 transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:-translate-y-2">
                  <img src={profile.image} alt={profile.name} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
                  
                  {isEditing && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Edit2 className="text-white w-8 h-8" />
                    </div>
                  )}
                </div>
              </div>
              <span className="mt-4 text-xl font-bold text-stone-500 group-hover:text-stone-900 transition-colors">
                {profile.name}
              </span>
            </motion.div>
          ))}

          {/* Add Profile Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: profiles.length * 0.1 }}
            className="flex flex-col items-center group cursor-pointer"
          >
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl border-4 border-transparent bg-stone-100 flex items-center justify-center group-hover:bg-stone-200 transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:-translate-y-2">
              <Plus className="w-16 h-16 text-stone-400 group-hover:text-stone-900 transition-colors" />
            </div>
            <span className="mt-4 text-xl font-bold text-stone-500 group-hover:text-stone-900 transition-colors">
              Add Profile
            </span>
          </motion.div>
        </div>

        <motion.button 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => setIsEditing(!isEditing)}
          className="mt-20 border-2 border-stone-200 text-stone-500 px-8 py-3 rounded-xl font-bold hover:border-stone-400 hover:text-stone-900 transition-all uppercase tracking-widest text-sm bg-white shadow-sm"
        >
          {isEditing ? 'Done' : 'Manage Profiles'}
        </motion.button>

      </div>
    </div>
  );
}
