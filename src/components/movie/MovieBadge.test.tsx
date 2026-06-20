import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MovieBadge } from './MovieBadge'

describe('MovieBadge', () => {
  it('should render the rating score rounded to one decimal', () => {
    render(<MovieBadge rating={7.5} />)
    expect(screen.getByText(/7\.5/)).toBeInTheDocument()
  })

  it('should apply green color class for rating 7 and above', () => {
    const { container } = render(<MovieBadge rating={8} />)
    expect(container.firstChild).toHaveClass('bg-green-600')
  })

  it('should apply yellow color class for rating between 5 and 6.9', () => {
    const { container } = render(<MovieBadge rating={6} />)
    expect(container.firstChild).toHaveClass('bg-yellow-600')
  })

  it('should apply red color class for rating below 5', () => {
    const { container } = render(<MovieBadge rating={3} />)
    expect(container.firstChild).toHaveClass('bg-red-700')
  })

  it('should render star symbol before the score', () => {
    render(<MovieBadge rating={7} />)
    expect(screen.getByText(/★/)).toBeInTheDocument()
  })
})
