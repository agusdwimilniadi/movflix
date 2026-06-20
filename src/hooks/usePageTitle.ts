import { useEffect } from 'react'

export function usePageTitle(title: string | null | undefined) {
  useEffect(() => {
    if (title) {
      document.title = `${title} - MovFlix`
    }
    return () => {
      document.title = 'MovFlix'
    }
  }, [title])
}
