import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MovieGrid } from './MovieGrid'
import type { Movie } from '../../types/movie'

const mockMovies: Movie[] = [
  {
    id: 1,
    title: 'Movie One',
    overview: 'Overview one',
    poster_path: '/poster1.jpg',
    backdrop_path: '/backdrop1.jpg',
    release_date: '2024-01-01',
    vote_average: 8,
    vote_count: 500,
    genre_ids: [28],
  },
  {
    id: 2,
    title: 'Movie Two',
    overview: 'Overview two',
    poster_path: '/poster2.jpg',
    backdrop_path: '/backdrop2.jpg',
    release_date: '2024-03-10',
    vote_average: 6,
    vote_count: 300,
    genre_ids: [18],
  },
]

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>{children}</MemoryRouter>
)

beforeEach(() => {
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      observe = vi.fn()
      disconnect = vi.fn()
      unobserve = vi.fn()
    }
  )
})

describe('MovieGrid', () => {
  it('should render all movie cards', () => {
    render(
      <MovieGrid
        movies={mockMovies}
        hasNextPage={false}
        isFetchingNextPage={false}
        onLoadMore={vi.fn()}
      />,
      { wrapper }
    )
    expect(screen.getByText('Movie One')).toBeInTheDocument()
    expect(screen.getByText('Movie Two')).toBeInTheDocument()
  })

  it('should show skeleton cards when fetching next page', () => {
    const { container } = render(
      <MovieGrid
        movies={mockMovies}
        hasNextPage={true}
        isFetchingNextPage={true}
        onLoadMore={vi.fn()}
      />,
      { wrapper }
    )
    expect(container.querySelectorAll('.animate-pulse').length).toBeGreaterThan(0)
  })

  it('should not show skeleton cards when not fetching next page', () => {
    const { container } = render(
      <MovieGrid
        movies={mockMovies}
        hasNextPage={false}
        isFetchingNextPage={false}
        onLoadMore={vi.fn()}
      />,
      { wrapper }
    )
    expect(container.querySelectorAll('.animate-pulse').length).toBe(0)
  })

  it('should render an empty grid when no movies are provided', () => {
    const { container } = render(
      <MovieGrid
        movies={[]}
        hasNextPage={false}
        isFetchingNextPage={false}
        onLoadMore={vi.fn()}
      />,
      { wrapper }
    )
    expect(container.querySelectorAll('a').length).toBe(0)
  })
})
