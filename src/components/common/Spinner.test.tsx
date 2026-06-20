import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Spinner } from './Spinner'

describe('Spinner', () => {
  it('should render with loading role', () => {
    render(<Spinner />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('should have accessible label', () => {
    render(<Spinner />)
    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()
  })

  it('should apply md size class by default', () => {
    render(<Spinner />)
    expect(screen.getByRole('status')).toHaveClass('w-8', 'h-8')
  })

  it('should apply sm size class', () => {
    render(<Spinner size="sm" />)
    expect(screen.getByRole('status')).toHaveClass('w-5', 'h-5')
  })

  it('should apply lg size class', () => {
    render(<Spinner size="lg" />)
    expect(screen.getByRole('status')).toHaveClass('w-12', 'h-12')
  })
})
