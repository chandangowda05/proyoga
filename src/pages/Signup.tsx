import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, googleProvider } from '../lib/firebase';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import { Activity } from 'lucide-react';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const createProfileDocument = async (uid: string, userEmail: string | null, displayName: string | null, photoURL: string | null) => {
    await setDoc(doc(db, 'users', uid), {
      uid,
      email: userEmail,
      displayName: displayName || 'Yoga Enthusiast',
      photoURL: photoURL || '',
      createdAt: serverTimestamp(),
      totalSessions: 0,
      avgAccuracy: 0,
      level: 'beginner',
      preferences: {
        voiceFeedback: true,
        vibrationAlerts: false,
        dominantFoot: 'right',
        targetPoses: []
      }
    });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      await createProfileDocument(userCredential.user.uid, email, name, null);
      
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      // For Google login, check if it's a new user and create doc if so
      // For simplicity in this demo, we just upsert the profile doc
      await createProfileDocument(
        userCredential.user.uid, 
        userCredential.user.email, 
        userCredential.user.displayName, 
        userCredential.user.photoURL
      );
      
      toast.success('Account created with Google!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Google sign up failed');
    }
  };

  return (
    <AnimatedBackground>
      {/* Left side: Branding / Tagline */}
      <div className="hidden md:flex w-1/2 flex-col justify-center px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-accent-teal/20 flex items-center justify-center border border-accent-teal/30 shadow-glow">
              <Activity className="text-accent-teal w-7 h-7" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-display text-text-primary tracking-tight">ProYoga Mat</h1>
          </div>
          <p className="text-xl lg:text-2xl font-body text-text-secondary leading-relaxed max-w-lg">
            Join the future of personal wellness. Start your journey with intelligent feedback and real-time form correction.
          </p>
        </motion.div>
      </div>

      {/* Right side: Signup Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12">
        <motion.div 
          className="w-full max-w-md glass-panel rounded-card p-8 shadow-2xl relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Subtle inner glow top border */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-teal/50 to-transparent" />
          
          <div className="md:hidden flex flex-col items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-accent-teal/20 flex items-center justify-center border border-accent-teal/30 shadow-glow mb-4">
              <Activity className="text-accent-teal w-7 h-7" />
            </div>
            <h2 className="text-2xl font-display text-center">ProYoga Mat</h2>
          </div>

          <h2 className="text-3xl font-display mb-2 hidden md:block">Create Account</h2>
          <p className="text-text-secondary mb-8 hidden md:block">Begin your yoga journey</p>

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-bg-elevated border border-border rounded-btn px-4 py-3 text-text-primary focus:outline-none focus:border-accent-teal focus:ring-1 focus:ring-accent-teal transition-colors"
                placeholder="Jane Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-bg-elevated border border-border rounded-btn px-4 py-3 text-text-primary focus:outline-none focus:border-accent-teal focus:ring-1 focus:ring-accent-teal transition-colors"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full bg-bg-elevated border border-border rounded-btn px-4 py-3 text-text-primary focus:outline-none focus:border-accent-teal focus:ring-1 focus:ring-accent-teal transition-colors"
                placeholder="••••••••"
              />
            </div>
            
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-accent-teal text-bg-primary font-bold py-3 px-4 rounded-btn hover:bg-accent-teal/90 transition-all shadow-glow hover:shadow-glow-lg disabled:opacity-50 mt-4"
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-6 flex items-center">
            <div className="flex-grow h-px bg-border"></div>
            <span className="px-4 text-sm text-text-secondary">OR</span>
            <div className="flex-grow h-px bg-border"></div>
          </div>

          <button 
            onClick={handleGoogleSignup}
            type="button"
            className="w-full mt-6 bg-white text-gray-900 font-semibold py-3 px-4 rounded-btn hover:bg-gray-100 transition-colors flex items-center justify-center gap-3"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          <p className="mt-8 text-center text-text-secondary text-sm">
            Already have an account? <Link to="/login" className="text-accent-teal hover:underline font-medium">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </AnimatedBackground>
  );
}
