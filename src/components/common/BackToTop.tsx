import { useEffect, useState } from 'react'
import { HiArrowUp } from 'react-icons/hi2'

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-6 z-50 bg-movflix-red hover:bg-red-700 text-white p-3 rounded-full shadow-lg transition-colors duration-200"
      aria-label="Back to top"
    >
      <HiArrowUp className="w-5 h-5" />
    </button>
  )
}
