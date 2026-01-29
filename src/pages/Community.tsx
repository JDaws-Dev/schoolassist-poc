import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ExternalLink, MessageCircle, Users } from 'lucide-react'

const FACEBOOK_GROUP = {
  name: 'The Queen Mothers of Artios',
  url: 'https://www.facebook.com/groups/179521002691613/',
  description: 'Main Facebook group for all parents — announcements, questions, and volunteer coordination.',
}

const GROUPME_CHATS = [
  {
    name: 'Elementary Parents (K-6)',
    url: 'https://groupme.com/join_group/103000376/K14Mdomu',
    description: 'Daily updates, lunch orders, and field trip coordination.',
  },
  {
    name: 'Junior High Parents (7-8)',
    url: 'https://groupme.com/join_group/103000520/kNrkPm3r',
    description: 'Junior high discussions and event planning.',
  },
  {
    name: 'High School Parents (9-12)',
    url: 'https://groupme.com/join_group/61225305/sekxr3mG',
    description: 'High school events, senior activities, and college prep.',
  },
]

const WHY_JOIN_REASONS = [
  'Lost & found',
  'Last-minute volunteer requests',
  'Field trip coordination',
  'Book & uniform sales',
  'Quick reminders',
  'Community support',
]

export default function Community() {
  return (
    <div className="space-y-6">
      {/* Disclaimer */}
      <div className="rounded-xl bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
        <p>
          These groups are created and run by Artios parents — not the school. They're welcoming spaces where moms and dads share info, coordinate, and support each other.
        </p>
      </div>

      {/* Onboarding tip for new parents */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm">
        <p className="font-medium text-primary">New to Artios?</p>
        <p className="mt-1 text-muted-foreground">
          Join your grade-level GroupMe first — that's where day-to-day communication happens.
        </p>
      </div>

      {/* Why Join section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Why Join?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {WHY_JOIN_REASONS.map((reason) => (
              <span
                key={reason}
                className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
              >
                {reason}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Facebook Group */}
      <Card className="bg-gradient-to-br from-[#1877F2]/10 via-background to-background">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-[#1877F2]" />
            Facebook Group
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <a
            href={FACEBOOK_GROUP.url}
            target="_blank"
            rel="noreferrer"
            className="block rounded-2xl border border-border/60 bg-background px-4 py-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-foreground">{FACEBOOK_GROUP.name}</span>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{FACEBOOK_GROUP.description}</p>
          </a>
        </CardContent>
      </Card>

      {/* GroupMe Chats */}
      <Card className="bg-gradient-to-br from-[#00AFF0]/10 via-background to-background">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-[#00AFF0]" />
            GroupMe Chats
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {GROUPME_CHATS.map((group) => (
            <a
              key={group.name}
              href={group.url}
              target="_blank"
              rel="noreferrer"
              className="block rounded-2xl border border-border/60 bg-background px-4 py-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">{group.name}</span>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{group.description}</p>
            </a>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
