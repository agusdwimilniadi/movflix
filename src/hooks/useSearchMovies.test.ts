import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createElement } from 'react'
import { useSearchMovies } from './useSearchMovies'
import * as movieService from '../services/movieService'

vi.mock('../services/movieService')

const mockPage = {
  page: 1,
  total_pages: 2,
  total_results: 30,
  results: [
    {
      id: 10,
      title: 'Avengers',
      overview: 'Heroes assemble',
      poster_path: '/avengers.jpg',
      backdrop_path: '/backdrop.jpg',
      release_date: '2012-04-25',
      vote_average: 8.5,
      vote_count: 2000,
      genre_ids: [28, 12],
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
  vi.mocked(movieService.searchMovies).mockResolvedValue(mockPage)
})

describe('useSearchMovies', () => {
  it('should not fetch when query is empty', () => {
    const { result } = renderHook(() => useSearchMovies(''), { wrapper: createWrapper() })
    expect(result.current.isFetching).toBe(false)
    expect(movieService.searchMovies).not.toHaveBeenCalled()
  })

  it('should not fetch when query is only whitespace', () => {
    const { result } = renderHook(() => useSearchMovies('   '), { wrapper: createWrapper() })
    expect(result.current.isFetching).toBe(false)
  })

  it('should fetch when query is non-empty', async () => {
    const { result } = renderHook(() => useSearchMovies('avengers'), { wrapper: createWrapper() })
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(movieService.searchMovies).toHaveBeenCalledWith('avengers', 1)
  })

  it('should return search results', async () => {
    const { result } = renderHook(() => useSearchMovies('avengers'), { wrapper: createWrapper() })
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data?.pages[0].results[0].title).toBe('Avengers')
  })

  it('should set error state when fetch fails', async () => {
    vi.mocked(movieService.searchMovies).mockRejectedValue(new Error('Network error'))
    const { result } = renderHook(() => useSearchMovies('avengers'), { wrapper: createWrapper() })
    await waitFor(() => expect(result.current.isError).toBe(true))
  })
})
