import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MovieGridSkeleton } from './MovieGridSkeleton'

describe('MovieGridSkeleton', () => {
  it('should render default 18 skeleton cards', () => {
    const { container } = render(<MovieGridSkeleton />)
    const cards = container.querySelectorAll('.animate-pulse')
    expect(cards.length).toBeGreaterThanOrEqual(18)
  })

  it('should render custom count of skeleton cards', () => {
    const { container } = render(<MovieGridSkeleton count={6} />)
    const grid = container.querySelector('.grid')
    expect(grid?.children.length).toBe(6)
  })

  it('should render hero skeleton when showHero is true', () => {
    const { container } = render(<MovieGridSkeleton showHero />)
    const heroSkeleton = container.querySelector('.h-\\[80vh\\]')
    expect(heroSkeleton).toBeInTheDocument()
  })

  it('should not render hero skeleton when showHero is false', () => {
    const { container } = render(<MovieGridSkeleton showHero={false} />)
    const heroSkeleton = container.querySelector('.h-\\[80vh\\]')
    expect(heroSkeleton).not.toBeInTheDocument()
  })

  it('should render title skeleton placeholder', () => {
    const { container } = render(<MovieGridSkeleton />)
    const titleSkeleton = container.querySelector('.h-6.w-32')
    expect(titleSkeleton).toBeInTheDocument()
  })
})
