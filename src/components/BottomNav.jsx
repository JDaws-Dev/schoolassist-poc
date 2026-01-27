import { NavLink } from 'react-router-dom';
import { Home, MessageCircle, Calendar, BookOpen } from 'lucide-react';

const NAV_ITEMS = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/chat', icon: MessageCircle, label: 'Chat' },
  { to: '/calendar', icon: Calendar, label: 'Calendar' },
  { to: '/resources', icon: BookOpen, label: 'Resources' }
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-100 shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.08)] px-2 pb-safe z-50 lg:hidden">
      <div className="max-w-lg mx-auto flex justify-around">
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `relative flex flex-col items-center justify-center gap-1 min-w-[64px] min-h-[56px] py-2 px-3 rounded-xl transition-all duration-200 ease-out ${
                isActive
                  ? 'text-blue-600'
                  : 'text-gray-400 hover:text-gray-600 active:scale-95'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {/* Active indicator - top pill */}
                <span
                  className={`absolute top-1 left-1/2 -translate-x-1/2 h-[3px] rounded-full bg-blue-600 transition-all duration-200 ease-out ${
                    isActive ? 'w-6 opacity-100' : 'w-0 opacity-0'
                  }`}
                />

                {/* Icon container with background highlight */}
                <span
                  className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 ease-out ${
                    isActive
                      ? 'bg-blue-50'
                      : 'bg-transparent'
                  }`}
                >
                  <Icon
                    className={`transition-all duration-200 ease-out ${
                      isActive ? 'w-6 h-6 stroke-[2.5]' : 'w-5 h-5 stroke-2'
                    }`}
                  />
                </span>

                {/* Label */}
                <span
                  className={`text-[11px] font-semibold tracking-tight transition-all duration-200 ease-out ${
                    isActive ? 'opacity-100' : 'opacity-70'
                  }`}
                >
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
