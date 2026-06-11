import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Compass } from 'lucide-react';
import AnimatedBackground from '../components/ui/AnimatedBackground';

export default function NotFound() {
  return (
    <AnimatedBackground>
      <div className="flex flex-col items-center justify-center w-full min-h-screen p-6 text-center z-10 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Compass className="w-24 h-24 text-accent-teal/50 mx-auto mb-8 animate-pulse" />
          <h1 className="text-7xl font-display font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-accent-teal to-accent-blue">
            404
          </h1>
          <h2 className="text-3xl font-display font-semibold mb-6">You've strayed from the path</h2>
          <p className="text-xl text-text-secondary mb-10 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. Let's get you back to your practice.
          </p>
          
          <Link 
            to="/dashboard" 
            className="inline-flex items-center gap-2 bg-accent-teal text-bg-primary font-bold py-4 px-8 rounded-pill hover:bg-accent-teal/90 transition-all shadow-glow hover:shadow-glow-lg text-lg"
          >
            <Home className="w-5 h-5" /> Return to Dashboard
          </Link>
        </motion.div>
      </div>
    </AnimatedBackground>
  );
}
