import { renderHook } from '@testing-library/react'
import { describe, it, expect, afterEach } from 'vitest'
import { usePageTitle } from './usePageTitle'

afterEach(() => {
  document.title = ''
})

describe('usePageTitle', () => {
  it('should set document title with MovFlix suffix', () => {
    renderHook(() => usePageTitle('Popular'))
    expect(document.title).toBe('Popular - MovFlix')
  })

  it('should not change title when value is null', () => {
    document.title = 'MovFlix'
    renderHook(() => usePageTitle(null))
    expect(document.title).toBe('MovFlix')
  })

  it('should not change title when value is undefined', () => {
    document.title = 'MovFlix'
    renderHook(() => usePageTitle(undefined))
    expect(document.title).toBe('MovFlix')
  })

  it('should reset title to MovFlix on unmount', () => {
    const { unmount } = renderHook(() => usePageTitle('Inception'))
    expect(document.title).toBe('Inception - MovFlix')
    unmount()
    expect(document.title).toBe('MovFlix')
  })

  it('should update title when value changes', () => {
    const { rerender } = renderHook(({ title }) => usePageTitle(title), {
      initialProps: { title: 'Popular' as string | null },
    })
    expect(document.title).toBe('Popular - MovFlix')
    rerender({ title: 'Top Rated' })
    expect(document.title).toBe('Top Rated - MovFlix')
  })
})
