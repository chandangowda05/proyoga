import { NavLink } from 'react-router-dom';
import { Home, Camera, Grid, BarChart2, User } from 'lucide-react';

const mobileNavItems = [
  { name: 'Home', path: '/dashboard', icon: Home },
  { name: 'Pose', path: '/pose-detection', icon: Camera },
  { name: 'Heatmap', path: '/pressure', icon: Grid },
  { name: 'Analytics', path: '/analytics', icon: BarChart2 },
  { name: 'Profile', path: '/profile', icon: User },
];

export default function MobileNav() {
  return (
    <nav className="md:hidden h-16 bg-bg-secondary/90 backdrop-blur-md border-t border-border flex items-center justify-around px-2 z-50 sticky bottom-0">
      {mobileNavItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => `
            flex flex-col items-center justify-center w-16 h-full space-y-1 transition-colors
            ${isActive ? 'text-accent-teal' : 'text-text-secondary hover:text-text-primary'}
          `}
        >
          {({ isActive }) => (
            <>
              <div className="relative">
                <item.icon className={`w-6 h-6 ${isActive ? 'drop-shadow-[0_0_8px_rgba(0,212,170,0.5)]' : ''}`} />
                {isActive && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent-teal rounded-full" />
                )}
              </div>
              <span className="text-[10px] font-medium leading-none">{item.name}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
