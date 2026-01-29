import { BarChart3, MessageSquare, ShieldCheck } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAggregatedMetrics, useChatAnalytics } from '@/hooks/useConvex'

export function AnalyticsPanel() {
  const analytics = useChatAnalytics()
  const metrics = useAggregatedMetrics()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Analytics
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border/60 bg-background p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MessageSquare className="h-4 w-4" />
            Chat Sessions
          </div>
          <p className="mt-2 text-2xl font-semibold">{analytics?.totalSessions ?? 0}</p>
          <p className="text-xs text-muted-foreground">Total sessions started</p>
        </div>
        <div className="rounded-2xl border border-border/60 bg-background p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MessageSquare className="h-4 w-4" />
            Messages Sent
          </div>
          <p className="mt-2 text-2xl font-semibold">{analytics?.totalMessages ?? 0}</p>
          <p className="text-xs text-muted-foreground">Total messages</p>
        </div>
        <div className="rounded-2xl border border-border/60 bg-background p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4" />
            Notification Views
          </div>
          <p className="mt-2 text-2xl font-semibold">{metrics?.totalViews ?? 0}</p>
          <p className="text-xs text-muted-foreground">Views - {metrics?.totalDismisses ?? 0} dismisses</p>
        </div>
      </CardContent>
    </Card>
  )
}
