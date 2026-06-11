import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Activity, 
  Settings, 
  User, 
  ChevronLeft, 
  ChevronRight,
  Target,
  Users,
  Compass,
  Camera,
  MessageSquare,
  Scale,
  Footprints,
  Cpu,
  LogOut
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { auth } from '../../lib/firebase';
import { signOut } from 'firebase/auth';
import toast from 'react-hot-toast';

const menuItems = [
  { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Pose Camera', path: '/pose-detection', icon: Camera },
  { name: 'Guided Yoga', path: '/guided', icon: Compass },
  { name: 'Pressure Map', path: '/pressure', icon: Footprints },
  { name: 'Balance Tracker', path: '/balance', icon: Scale },
  { name: 'Analytics', path: '/analytics', icon: Target },
  { name: 'Feedback', path: '/feedback', icon: MessageSquare },
  { name: 'Hardware Sensors', path: '/sensors', icon: Cpu },
  { name: 'Community', path: '/community', icon: Users },
  { name: 'Profile', path: '/profile', icon: User },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export default function Sidebar() {
  const { isSidebarOpen, toggleSidebar } = useAppStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success('Signed out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  return (
    <aside 
      className={`bg-white border-r border-border h-full transition-all duration-500 shadow-sidebar z-30 flex flex-col ${isSidebarOpen ? 'w-72' : 'w-24'}`}
    >
      {/* Logo Area */}
      <div className="h-28 flex items-center px-7 border-b border-border/50">
        <div className="w-10 h-10 bg-accent-primary rounded-xl flex items-center justify-center shrink-0">
          <Activity className="text-white w-6 h-6" />
        </div>
        {isSidebarOpen && (
          <span className="ml-4 font-display font-bold text-xl text-stone-900 tracking-tight uppercase">Yoga Life</span>
        )}
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 py-10 px-4 space-y-2 overflow-y-auto overflow-x-hidden custom-scrollbar">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center px-4 py-4 rounded-xl transition-all group relative font-bold text-sm
              ${isActive 
                ? 'bg-green-700 text-white shadow-lg' 
                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'}
            `}
          >
            {({ isActive }) => (
              <>
                <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-stone-400 group-hover:text-stone-900'} transition-colors`} />
                {isSidebarOpen && <span className="ml-4 whitespace-nowrap">{item.name}</span>}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Toggle & Sign Out */}
      <div className="p-6 border-t border-stone-100 space-y-4">
        <button 
          onClick={handleSignOut}
          className="w-full flex items-center px-4 py-3 bg-red-50 hover:bg-red-100 rounded-xl transition-all text-red-600 group"
        >
          <LogOut className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
          {isSidebarOpen && <span className="ml-4 font-bold text-xs uppercase tracking-widest">Sign Out</span>}
        </button>

        <button 
          onClick={toggleSidebar}
          className="w-full flex items-center justify-center py-3 bg-stone-50 hover:bg-stone-100 rounded-xl transition-all text-stone-400 hover:text-stone-900"
        >
          {isSidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>
      </div>
    </aside>
  );
}
