import { CONTACTS, FAQ, QUICK_LINKS, SCHEDULE } from '@/data/initialData'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ExternalLink, Play } from 'lucide-react'

const SECTION_TITLES: Record<string, string> = {
  essential: 'Essential',
  events: 'Events',
  newsletters: 'Newsletters',
  parentMeetings: 'Parent Meetings',
  volunteer: 'Volunteer',
  shopping: 'Shopping',
  podcasts: 'Podcasts',
  social: 'Connect With Us',
}

export default function Resources() {
  return (
    <div className="space-y-6">
      {/* Artios+ - Student Work Showcase */}
      <Card className="bg-gradient-to-br from-purple-500/10 via-background to-background">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5 text-purple-500" />
            Student Performances
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Watch your kids shine! Artios+ showcases student work from Theater, Dance, Film, Choir, and Art classes.
          </p>
          <a
            href="https://artiosplus.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between rounded-2xl border border-purple-500/20 bg-purple-500/5 px-4 py-3 font-semibold text-purple-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-purple-500/10 hover:shadow-md dark:text-purple-400"
          >
            Visit Artios+
            <ExternalLink className="h-4 w-4" />
          </a>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.entries(QUICK_LINKS).map(([key, links]) => (
            <div key={key} className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground">{SECTION_TITLES[key] ?? key}</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {links.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl border border-border/60 bg-background p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <p className="text-sm font-semibold">{link.name}</p>
                    <p className="text-xs text-muted-foreground">{link.description}</p>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Schedule</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>Monday: {SCHEDULE.weekly.monday.division} ({SCHEDULE.weekly.monday.type})</p>
          <p>Tuesday: {SCHEDULE.weekly.tuesday.division} ({SCHEDULE.weekly.tuesday.type})</p>
          <p>Wednesday: {SCHEDULE.weekly.wednesday.division} ({SCHEDULE.weekly.wednesday.type})</p>
          <p>Thursday: {SCHEDULE.weekly.thursday.division} ({SCHEDULE.weekly.thursday.type})</p>
          <p>Friday: {SCHEDULE.weekly.friday.division} ({SCHEDULE.weekly.friday.type})</p>
          <Separator className="my-3" />
          <p>Doors open: {SCHEDULE.timing.doorsOpen}</p>
          <p>School starts: {SCHEDULE.timing.schoolStarts}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>FAQ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {FAQ.map((item) => (
            <div key={item.question} className="space-y-1">
              <p className="text-sm font-semibold">{item.question}</p>
              <p className="text-sm text-muted-foreground">{item.answer}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p className="font-semibold">Artios Academies of Sugar Hill</p>
          <p className="text-muted-foreground">415 Brogdon Road, Suwanee, GA 30024</p>
          <Separator className="my-2" />
          <p className="font-semibold">Directors</p>
          <div className="space-y-1 text-muted-foreground">
            {CONTACTS.directors.map((director) => (
              <p key={director.name}>
                {director.name}
                {director.email ? ` (${director.email})` : ''}
              </p>
            ))}
          </div>
          <Separator className="my-2" />
          <p className="font-semibold">Other Contacts</p>
          <div className="space-y-1 text-muted-foreground">
            <p>Technical Support: {CONTACTS.support?.email ?? 'support@artiosacademies.com'}</p>
            <p>Billing: {CONTACTS.billing?.email ?? 'billing@artiosacademies.com'}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
