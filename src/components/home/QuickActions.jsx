import { Link } from 'react-router-dom'
import { GraduationCap, UtensilsCrossed, Calendar, BookOpen } from 'lucide-react'

const ACTIONS = [
  {
    label: 'FACTS',
    icon: GraduationCap,
    href: 'https://factsmgt.com',
    external: true,
    gradient: 'from-blue-500 to-blue-600',
    shadow: 'shadow-blue-200',
  },
  {
    label: 'Lunch',
    icon: UtensilsCrossed,
    href: 'https://artioscafe.com',
    external: true,
    gradient: 'from-amber-500 to-orange-500',
    shadow: 'shadow-amber-200',
  },
  {
    label: 'Calendar',
    icon: Calendar,
    to: '/calendar',
    gradient: 'from-purple-500 to-indigo-600',
    shadow: 'shadow-purple-200',
  },
  {
    label: 'Resources',
    icon: BookOpen,
    to: '/resources',
    gradient: 'from-teal-500 to-emerald-600',
    shadow: 'shadow-teal-200',
  },
]

export default function QuickActions() {
  return (
    <div className="grid grid-cols-4 gap-3">
      {ACTIONS.map(({ label, icon: Icon, href, external, to, gradient, shadow }) => {
        const className = `flex flex-col items-center gap-1.5 p-3 min-h-[84px] bg-white rounded-2xl shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0 border border-gray-100`

        const content = (
          <>
            <div className={`p-3 bg-gradient-to-br ${gradient} rounded-xl shadow-md ${shadow}`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-semibold text-gray-700">{label}</span>
          </>
        )

        if (external) {
          return (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={className}>
              {content}
            </a>
          )
        }

        return (
          <Link key={label} to={to} className={className}>
            {content}
          </Link>
        )
      })}
    </div>
  )
}
