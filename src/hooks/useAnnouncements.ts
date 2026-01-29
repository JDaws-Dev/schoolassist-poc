import { useAnnouncements as useAllAnnouncements, useRecentAnnouncements } from '@/hooks/useConvex'

export function useAnnouncements(limit?: number) {
  if (limit) {
    return useRecentAnnouncements(limit)
  }
  return useAllAnnouncements()
}
