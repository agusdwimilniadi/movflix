import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BaseImage } from './BaseImage'

describe('BaseImage', () => {
  it('should render an img element with given src', () => {
    render(<BaseImage src="/poster.jpg" alt="Movie poster" />)
    expect(screen.getByAltText('Movie poster')).toHaveAttribute('src', '/poster.jpg')
  })

  it('should fall back to no-image.jpg on error by default', () => {
    render(<BaseImage src="/broken.jpg" alt="Broken" />)
    const img = screen.getByAltText('Broken')
    fireEvent.error(img)
    expect(img).toHaveAttribute('src', '/no-image.jpg')
  })

  it('should fall back to custom fallback src on error', () => {
    render(<BaseImage src="/broken.jpg" alt="Broken" fallback="/custom-fallback.jpg" />)
    const img = screen.getByAltText('Broken')
    fireEvent.error(img)
    expect(img).toHaveAttribute('src', '/custom-fallback.jpg')
  })

  it('should not trigger fallback more than once on repeated errors', () => {
    render(<BaseImage src="/broken.jpg" alt="Broken" />)
    const img = screen.getByAltText('Broken')
    fireEvent.error(img)
    fireEvent.error(img)
    expect(img).toHaveAttribute('src', '/no-image.jpg')
  })

  it('should pass additional props to the img element', () => {
    render(<BaseImage src="/poster.jpg" alt="Movie" className="rounded" loading="lazy" />)
    const img = screen.getByAltText('Movie')
    expect(img).toHaveClass('rounded')
    expect(img).toHaveAttribute('loading', 'lazy')
  })
})
