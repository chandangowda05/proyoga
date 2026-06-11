import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import MobileNav from './MobileNav';

export default function AppLayout() {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-bg-primary overflow-hidden text-text-primary font-body selection:bg-accent-primary/10">
      {/* Sidebar - Fixed to the left */}
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 bg-bg-primary relative overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-glow rounded-full blur-[120px] pointer-events-none" />
        
        <TopBar />

        <div className="flex-1 overflow-y-auto overflow-x-hidden relative">
          <div className="p-6 md:p-8 lg:p-12 relative z-10 w-full max-w-[1400px] mx-auto min-h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <MobileNav />
      </main>
    </div>
  );
}
