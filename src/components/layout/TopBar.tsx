import { Bell, Menu, Search } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { useAuth } from '../../context/AuthContext';

export default function TopBar() {
  const { toggleSidebar } = useAppStore();
  const { currentUser } = useAuth();

  return (
    <header className="h-28 flex items-center justify-between px-8 md:px-12 z-20 relative bg-transparent">
      {/* Left: Search/Search Trigger */}
      <div className="flex items-center gap-6">
        <button 
          onClick={toggleSidebar}
          className="md:hidden p-3 text-text-secondary hover:text-text-primary bg-white border border-border rounded-xl shadow-sm"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <div className="hidden md:flex items-center gap-3 bg-white border border-stone-200 px-5 py-2.5 rounded-xl text-stone-400 w-72 shadow-sm focus-within:border-green-700 transition-all">
          <Search className="w-4 h-4" />
          <input type="text" placeholder="Search sessions..." className="bg-transparent border-none outline-none text-sm font-medium w-full text-stone-900 placeholder:text-stone-300" />
        </div>
      </div>

      {/* Right: Status & Profile */}
      <div className="flex items-center gap-4 md:gap-8">
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white border border-stone-200 px-4 py-2 rounded-xl text-xs font-bold text-stone-600 shadow-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            System Online
          </div>
        </div>

        <button className="relative p-3 text-stone-400 hover:text-stone-900 bg-white border border-stone-200 rounded-xl shadow-sm transition-all group">
          <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-green-700 rounded-full border-2 border-white"></span>
        </button>

        <div className="flex items-center gap-4 pl-4 md:pl-8 border-l border-stone-200">
          <div className="hidden md:block text-right">
            <p className="text-sm font-bold text-stone-900 leading-none">{currentUser?.displayName || 'User'}</p>
            <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-1.5">{currentUser?.email || 'yoga@pro.com'}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-bg-primary border border-border p-1 shadow-sm overflow-hidden group cursor-pointer hover:border-accent-primary transition-colors">
            <img 
              src={currentUser?.photoURL || `https://ui-avatars.com/api/?name=${currentUser?.displayName || 'User'}&background=F5F5F4&color=166534`} 
              alt="Avatar" 
              className="w-full h-full rounded-lg object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
