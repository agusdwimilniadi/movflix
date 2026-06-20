import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createElement } from 'react'
import { useMovies } from './useMovies'
import * as movieService from '../services/movieService'

vi.mock('../services/movieService')

const mockPage = {
  page: 1,
  total_pages: 3,
  total_results: 60,
  results: [
    {
      id: 1,
      title: 'Popular Movie',
      overview: 'Overview',
      poster_path: '/poster.jpg',
      backdrop_path: '/backdrop.jpg',
      release_date: '2024-01-01',
      vote_average: 8,
      vote_count: 500,
      genre_ids: [28],
    },
  ],
}

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return ({ children }: { children: React.ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children)
}

beforeEach(() => {
  vi.mocked(movieService.fetchMovies).mockResolvedValue(mockPage)
})

describe('useMovies', () => {
  it('should return movies data after successful fetch', async () => {
    const { result } = renderHook(() => useMovies('popular'), { wrapper: createWrapper() })
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data?.pages[0].results[0].title).toBe('Popular Movie')
  })

  it('should be in loading state initially', () => {
    const { result } = renderHook(() => useMovies('popular'), { wrapper: createWrapper() })
    expect(result.current.isLoading).toBe(true)
  })

  it('should have next page when total_pages is greater than current page', async () => {
    const { result } = renderHook(() => useMovies('popular'), { wrapper: createWrapper() })
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.hasNextPage).toBe(true)
  })

  it('should not have next page when on last page', async () => {
    vi.mocked(movieService.fetchMovies).mockResolvedValue({ ...mockPage, page: 3, total_pages: 3 })
    const { result } = renderHook(() => useMovies('popular'), { wrapper: createWrapper() })
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.hasNextPage).toBe(false)
  })

  it('should set error state when fetch fails', async () => {
    vi.mocked(movieService.fetchMovies).mockRejectedValue(new Error('Network error'))
    const { result } = renderHook(() => useMovies('popular'), { wrapper: createWrapper() })
    await waitFor(() => expect(result.current.isError).toBe(true))
  })
})
