import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { BackToTop } from './BackToTop'

beforeEach(() => {
  vi.stubGlobal('scrollTo', vi.fn())
  Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 0 })
})

describe('BackToTop', () => {
  it('should not render button when scrollY is below 400', () => {
    render(<BackToTop />)
    expect(screen.queryByRole('button', { name: /back to top/i })).not.toBeInTheDocument()
  })

  it('should render button when scrollY exceeds 400', () => {
    Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 401 })
    render(<BackToTop />)
    fireEvent.scroll(window)
    expect(screen.getByRole('button', { name: /back to top/i })).toBeInTheDocument()
  })

  it('should call scrollTo with top 0 when button is clicked', () => {
    Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 401 })
    render(<BackToTop />)
    fireEvent.scroll(window)
    fireEvent.click(screen.getByRole('button', { name: /back to top/i }))
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })
})
