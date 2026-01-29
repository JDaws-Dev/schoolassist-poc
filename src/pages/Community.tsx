import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ExternalLink, Users } from 'lucide-react'

const FACEBOOK_URL = 'https://www.facebook.com/groups/179521002691613/'
const GROUPS = [
  {
    name: 'Elementary Parents (K-6)',
    url: 'https://groupme.com/join_group/103000376/K14Mdomu',
  },
  {
    name: 'Junior High Parents (7-8)',
    url: 'https://groupme.com/join_group/103000520/kNrkPm3r',
  },
  {
    name: 'High School Parents (9-12)',
    url: 'https://groupme.com/join_group/61225305/sekxr3mG',
  },
]

export default function Community() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
        <p>
          These groups are created and run by Artios parents — not the school. They're welcoming spaces where moms and dads share info, coordinate, and support each other.
        </p>
      </div>

      <Card className="bg-gradient-to-br from-primary/10 via-background to-background">
        <CardHeader>
          <CardTitle>Parent Community</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            Used daily for announcements, volunteer coordination, and parent support.
          </p>
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between rounded-2xl border border-border/60 bg-background px-4 py-3 text-sm font-semibold text-primary shadow-sm"
          >
            The Queen Mothers of Artios
            <ExternalLink className="h-4 w-4" />
          </a>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>GroupMe Chats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {GROUPS.map((group) => (
            <a
              key={group.name}
              href={group.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-2xl border border-border/60 bg-background px-4 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                {group.name}
              </span>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </a>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
