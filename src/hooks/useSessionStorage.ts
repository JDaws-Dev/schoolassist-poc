import { useCallback, useState } from 'react'

export function useSessionStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return defaultValue
    const stored = sessionStorage.getItem(key)
    return stored ? (JSON.parse(stored) as T) : defaultValue
  })

  const update = useCallback(
    (next: T) => {
      setValue(next)
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(key, JSON.stringify(next))
      }
    },
    [key]
  )

  return [value, update] as const
}
