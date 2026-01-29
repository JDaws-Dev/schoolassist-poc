import { CalendarDays, ExternalLink, GraduationCap, Sandwich } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const actions = [
  {
    title: 'FACTS Portal',
    description: 'Grades, enrollment, attendance',
    icon: GraduationCap,
    href: 'https://factsmgt.com',
    external: true,
  },
  {
    title: 'Lunch Ordering',
    description: 'Artios Cafe orders',
    icon: Sandwich,
    href: 'https://artioscafe.com',
    external: true,
  },
  {
    title: 'Calendar',
    description: 'Full school calendar',
    icon: CalendarDays,
    href: '/calendar',
    external: false,
  },
]

export function QuickActions() {
  const deadlineLabel = 'Order by 10 AM on class days'

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3 sm:grid-cols-3">
        {actions.map((action) => {
          const Icon = action.icon
          const content = (
            <div className="flex h-full flex-col justify-between gap-4 rounded-2xl border border-border/60 bg-background p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                {action.external ? <ExternalLink className="h-4 w-4 text-muted-foreground" /> : null}
              </div>
              <div>
                <p className="text-sm font-semibold">{action.title}</p>
                <p className="text-xs text-muted-foreground">{action.description}</p>
                {action.title === 'Lunch Ordering' ? (
                  <p className="text-[11px] text-primary/80">{deadlineLabel}</p>
                ) : null}
              </div>
            </div>
          )

          if (action.external) {
            return (
              <a key={action.title} href={action.href} target="_blank" rel="noreferrer">
                {content}
              </a>
            )
          }
          return (
            <Link key={action.title} to={action.href}>
              {content}
            </Link>
          )
        })}
      </CardContent>
      <CardContent className="pt-0">
        <Button asChild variant="secondary" className="w-full">
          <Link to="/chat">Ask Arti a question</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
