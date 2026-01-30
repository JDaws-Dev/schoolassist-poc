import { CalendarDays, Home, MessageCircle, Users, BookOpen } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'

const links = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/chat', label: 'Chat', icon: MessageCircle, highlight: true },
  { to: '/calendar', label: 'Calendar', icon: CalendarDays },
  { to: '/resources', label: 'Resources', icon: BookOpen },
  { to: '/community', label: 'Community', icon: Users },
]

export function BottomNav() {
  return (
    // No longer needs position:fixed since parent AppShell is fixed
    // shrink-0 prevents flexbox from compressing the nav
    <nav className="shrink-0 border-t border-border/80 bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-3 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2">
        {links.map(({ to, label, icon: Icon, highlight }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex w-full flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-[0.7rem] font-semibold transition',
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              )
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full transition-all',
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : highlight
                        ? 'bg-primary/15 text-primary'
                        : 'text-inherit'
                  )}
                >
                  <Icon className="h-5 w-5" />
                </span>
                {label}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
