import { useMemo, useState } from 'react'
import { CONTACTS, FAQ, QUICK_LINKS, SCHEDULE } from '@/data/initialData'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronDown, ExternalLink, Link2, Play } from 'lucide-react'
import { useLinktreeLinks } from '@/hooks/useConvex'

function FAQItem({ question, answer, defaultOpen = false }: { question: string; answer: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <span className="text-sm font-semibold">{question}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        <p className="px-3 pb-2 pt-1 text-sm text-muted-foreground">{answer}</p>
      </CollapsibleContent>
    </Collapsible>
  )
}

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
  const linktreeLinks = useLinktreeLinks()

  // Get all existing URLs from QUICK_LINKS to filter duplicates
  const existingUrls = useMemo(() => {
    const urls = new Set<string>()
    // Add hardcoded URLs
    urls.add('https://artiosplus.com')
    urls.add('https://vimeo.com/artios')
    // Add all QUICK_LINKS URLs
    Object.values(QUICK_LINKS).flat().forEach((link) => {
      urls.add(link.url.toLowerCase())
    })
    return urls
  }, [])

  // Filter out duplicates from Linktree
  const newLinktreeLinks = useMemo(() => {
    return linktreeLinks.filter((link) => !existingUrls.has(link.url.toLowerCase()))
  }, [linktreeLinks, existingUrls])

  return (
    <div className="space-y-6">
      {/* Student Performances - Two options by grade level */}
      <Card className="bg-gradient-to-br from-purple-500/10 via-background to-background">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5 text-purple-500" />
            Student Performances
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Watch your kids shine! Student performances from Theater, Dance, Film, Choir, and Art classes.
          </p>
          <div className="space-y-3">
            <a
              href="https://artiosplus.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-2xl border border-purple-500/20 bg-purple-500/5 px-4 py-3 shadow-sm transition hover:-translate-y-0.5 hover:bg-purple-500/10 hover:shadow-md"
            >
              <div>
                <p className="font-semibold text-purple-700 dark:text-purple-400">Artios+</p>
                <p className="text-xs text-muted-foreground">High School (9-12)</p>
              </div>
              <ExternalLink className="h-4 w-4 text-purple-500" />
            </a>
            <a
              href="https://vimeo.com/artios"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-2xl border border-sky-500/20 bg-sky-500/5 px-4 py-3 shadow-sm transition hover:-translate-y-0.5 hover:bg-sky-500/10 hover:shadow-md"
            >
              <div>
                <p className="font-semibold text-sky-700 dark:text-sky-400">Vimeo</p>
                <p className="text-xs text-muted-foreground">Elementary & Jr High (K-8)</p>
              </div>
              <ExternalLink className="h-4 w-4 text-sky-500" />
            </a>
          </div>
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

      {/* Auto-synced Linktree links (new ones only) */}
      {newLinktreeLinks.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link2 className="h-5 w-5" />
              More Links
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              {newLinktreeLinks.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-border/60 bg-background p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <p className="text-sm font-semibold">{link.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{link.url}</p>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : null}

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
        <CardContent className="space-y-2">
          {FAQ.map((item, index) => (
            <FAQItem key={item.question} question={item.question} answer={item.answer} defaultOpen={index === 0} />
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
