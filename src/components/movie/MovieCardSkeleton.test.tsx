import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MovieCardSkeleton } from './MovieCardSkeleton'

describe('MovieCardSkeleton', () => {
  it('should render a skeleton element', () => {
    const { container } = render(<MovieCardSkeleton />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('should have animate-pulse class', () => {
    const { container } = render(<MovieCardSkeleton />)
    expect(container.firstChild).toHaveClass('animate-pulse')
  })

  it('should have correct aspect ratio container', () => {
    const { container } = render(<MovieCardSkeleton />)
    const inner = container.querySelector('.aspect-\\[2\\/3\\]')
    expect(inner).toBeInTheDocument()
  })
})
