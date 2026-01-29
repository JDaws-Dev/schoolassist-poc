import { useCallback, useState } from 'react'

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return defaultValue
    const stored = localStorage.getItem(key)
    return stored ? (JSON.parse(stored) as T) : defaultValue
  })

  const update = useCallback(
    (next: T) => {
      setValue(next)
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(next))
      }
    },
    [key]
  )

  return [value, update] as const
}
