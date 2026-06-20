import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import { MovieCard } from './MovieCard'
import type { Movie } from '../../types/movie'

const mockMovie: Movie = {
  id: 1,
  title: 'Test Movie',
  overview: 'A test movie overview',
  poster_path: '/test-poster.jpg',
  backdrop_path: '/test-backdrop.jpg',
  release_date: '2024-06-15',
  vote_average: 7.5,
  vote_count: 1000,
  genre_ids: [28, 12],
}

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>{children}</MemoryRouter>
)

describe('MovieCard', () => {
  it('should render movie title', () => {
    render(<MovieCard movie={mockMovie} />, { wrapper })
    expect(screen.getByText('Test Movie')).toBeInTheDocument()
  })

  it('should render a link to movie detail page', () => {
    render(<MovieCard movie={mockMovie} />, { wrapper })
    expect(screen.getByRole('link', { name: /test movie/i })).toHaveAttribute(
      'href',
      '/movie/1'
    )
  })

  it('should render the poster image', () => {
    render(<MovieCard movie={mockMovie} />, { wrapper })
    const img = screen.getByAltText('Test Movie')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', expect.stringMatching('/test-poster.jpg'))
  })

  it('should render release year', () => {
    render(<MovieCard movie={mockMovie} />, { wrapper })
    expect(screen.getByText('2024')).toBeInTheDocument()
  })
})
