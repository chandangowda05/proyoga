import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { updateProfile, signOut } from 'firebase/auth';
import { motion } from 'framer-motion';
import { LogOut, Settings, Edit2, User, Mail, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Profile() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [isSaving, setIsSaving] = useState(false);

  // Simple preferences
  const [preferences, setPreferences] = useState({
    voiceFeedback: true,
    vibrationAlerts: false,
    dominantFoot: 'right'
  });

  const handleSaveProfile = async () => {
    if (!currentUser) return;
    setIsSaving(true);
    try {
      await updateProfile(currentUser, { displayName });
      toast.success('Profile updated');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success('Signed out');
      navigate('/');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
    toast.success('Setting updated');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20">
      <div>
        <h1 className="text-4xl font-display font-bold text-stone-900 mb-2 tracking-tight">Your Profile</h1>
        <p className="text-stone-600 font-medium">Manage how you practice and your account details.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Profile Card */}
        <motion.div 
          className="bg-white p-10 rounded-[32px] border border-stone-200 lg:col-span-4 flex flex-col items-center text-center shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="relative mb-8 group">
            <div className="w-40 h-40 rounded-[32px] bg-stone-50 p-1 border border-stone-200 shadow-sm overflow-hidden">
              <img 
                src={currentUser?.photoURL || `https://ui-avatars.com/api/?name=${currentUser?.displayName || 'User'}&background=F5F5F4&color=166534&size=256`} 
                alt="Avatar" 
                className="w-full h-full rounded-[24px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <button className="absolute -bottom-2 -right-2 p-3 bg-green-700 text-white rounded-2xl shadow-lg hover:bg-green-800 transition-all active:scale-90">
              <Edit2 className="w-5 h-5" />
            </button>
          </div>

          {isEditing ? (
            <div className="w-full space-y-4">
              <input 
                type="text" 
                value={displayName} 
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-center focus:border-green-700 outline-none font-bold text-stone-900"
                placeholder="Your Name"
              />
              <div className="flex gap-3">
                <button onClick={() => setIsEditing(false)} className="flex-1 px-4 py-3 bg-white border border-stone-200 rounded-xl text-sm font-bold text-stone-500 hover:bg-stone-50 transition-all">Cancel</button>
                <button onClick={handleSaveProfile} disabled={isSaving} className="flex-1 px-4 py-3 bg-green-700 text-white rounded-xl text-sm font-bold hover:bg-green-800 transition-all">Save</button>
              </div>
            </div>
          ) : (
            <div className="mb-6">
              <h2 className="text-3xl font-display font-bold text-stone-900 flex items-center justify-center gap-3">
                {currentUser?.displayName || 'Yoga Student'}
                <button onClick={() => setIsEditing(true)} className="text-stone-300 hover:text-green-700 transition-all">
                  <Edit2 className="w-5 h-5" />
                </button>
              </h2>
              <p className="text-stone-500 font-medium mt-1">{currentUser?.email}</p>
            </div>
          )}

          <div className="w-full border-t border-stone-100 mt-4 pt-8 space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-stone-400 font-bold uppercase tracking-widest text-[10px]">Level</span>
              <span className="text-green-700 font-bold bg-green-50 px-3 py-1 rounded-full border border-green-100">Learning</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-stone-400 font-bold uppercase tracking-widest text-[10px]">Joined</span>
              <span className="text-stone-900 font-bold">May 2026</span>
            </div>
          </div>
        </motion.div>

        {/* Settings Area */}
        <div className="lg:col-span-8 space-y-8">
          
          <motion.div 
            className="bg-white p-10 rounded-[32px] border border-stone-200 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-stone-50 rounded-2xl flex items-center justify-center border border-stone-100">
                <Settings className="text-green-700 w-6 h-6" />
              </div>
              <h2 className="text-2xl font-display font-bold text-stone-900">Your Settings</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center justify-between p-6 bg-stone-50 rounded-[24px] border border-stone-100 group hover:border-green-200 transition-all">
                <div>
                  <h3 className="font-bold text-stone-900">Coach Voice</h3>
                  <p className="text-xs text-stone-500 font-medium mt-1">Guidance during practice</p>
                </div>
                <button 
                  onClick={() => togglePreference('voiceFeedback')}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all ${preferences.voiceFeedback ? 'bg-green-700' : 'bg-stone-200'}`}
                >
                  <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform ${preferences.voiceFeedback ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-6 bg-stone-50 rounded-[24px] border border-stone-100 group hover:border-green-200 transition-all">
                <div>
                  <h3 className="font-bold text-stone-900">Mat Feel</h3>
                  <p className="text-xs text-stone-500 font-medium mt-1">Vibration alerts for pose</p>
                </div>
                <button 
                  onClick={() => togglePreference('vibrationAlerts')}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all ${preferences.vibrationAlerts ? 'bg-green-700' : 'bg-stone-200'}`}
                >
                  <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform ${preferences.vibrationAlerts ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-6 bg-stone-50 rounded-[24px] border border-stone-100 md:col-span-2 group hover:border-green-200 transition-all">
                <div>
                  <h3 className="font-bold text-stone-900">Lead Foot</h3>
                  <p className="text-xs text-stone-500 font-medium mt-1">Used for balance tracking</p>
                </div>
                <div className="flex bg-white p-1 rounded-xl border border-stone-200 shadow-sm">
                  <button 
                    onClick={() => { setPreferences(p => ({...p, dominantFoot: 'left'})); toast.success('Saved'); }}
                    className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${preferences.dominantFoot === 'left' ? 'bg-green-700 text-white shadow-md' : 'text-stone-400 hover:text-stone-600'}`}
                  >Left</button>
                  <button 
                    onClick={() => { setPreferences(p => ({...p, dominantFoot: 'right'})); toast.success('Saved'); }}
                    className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${preferences.dominantFoot === 'right' ? 'bg-green-700 text-white shadow-md' : 'text-stone-400 hover:text-stone-600'}`}
                  >Right</button>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-stone-100 flex justify-between items-center">
              <button 
                onClick={handleSignOut}
                className="flex items-center gap-3 px-8 py-4 text-red-600 hover:bg-red-50 rounded-2xl transition-all font-bold uppercase tracking-widest text-xs border border-transparent hover:border-red-100"
              >
                <LogOut className="w-5 h-5" /> Sign Out
              </button>
              
              <div className="flex items-center gap-2 text-[10px] font-bold text-stone-300 uppercase tracking-widest">
                <Shield className="w-4 h-4" /> Secure Account
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
