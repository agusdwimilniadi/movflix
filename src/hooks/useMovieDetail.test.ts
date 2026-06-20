import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createElement } from 'react'
import { useMovieDetail } from './useMovieDetail'
import * as movieService from '../services/movieService'

vi.mock('../services/movieService')

const mockMovieDetail = {
  id: 1,
  title: 'Inception',
  overview: 'A mind-bending thriller',
  poster_path: '/inception.jpg',
  backdrop_path: '/backdrop.jpg',
  release_date: '2010-07-16',
  vote_average: 8.8,
  vote_count: 30000,
  runtime: 148,
  tagline: 'Your mind is the scene of the crime',
  genres: [{ id: 28, name: 'Action' }],
}

const mockCredits = {
  id: 1,
  cast: [{ id: 10, name: 'Leonardo DiCaprio', character: 'Cobb', profile_path: '/leo.jpg', order: 0 }],
  crew: [{ id: 20, name: 'Christopher Nolan', job: 'Director', department: 'Directing' }],
}

const mockVideos = {
  id: 1,
  results: [
    { id: 'v1', key: 'abc123', name: 'Official Trailer', site: 'YouTube', type: 'Trailer', official: true },
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
  vi.clearAllMocks()
  vi.mocked(movieService.fetchMovieDetail).mockResolvedValue(mockMovieDetail as any)
  vi.mocked(movieService.fetchCredits).mockResolvedValue(mockCredits as any)
  vi.mocked(movieService.fetchVideos).mockResolvedValue(mockVideos as any)
})

describe('useMovieDetail', () => {
  it('should return movie detail after successful fetch', async () => {
    const { result } = renderHook(() => useMovieDetail(1), { wrapper: createWrapper() })
    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.movie?.title).toBe('Inception')
  })

  it('should return credits after successful fetch', async () => {
    const { result } = renderHook(() => useMovieDetail(1), { wrapper: createWrapper() })
    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.credits?.cast[0].name).toBe('Leonardo DiCaprio')
  })

  it('should return videos after successful fetch', async () => {
    const { result } = renderHook(() => useMovieDetail(1), { wrapper: createWrapper() })
    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.videos?.results[0].key).toBe('abc123')
  })

  it('should not fetch when id is falsy', () => {
    const { result } = renderHook(() => useMovieDetail(0), { wrapper: createWrapper() })
    expect(result.current.isLoading).toBe(false)
    expect(movieService.fetchMovieDetail).not.toHaveBeenCalled()
  })

  it('should set error state when any fetch fails', async () => {
    vi.mocked(movieService.fetchMovieDetail).mockRejectedValue(new Error('Not found'))
    const { result } = renderHook(() => useMovieDetail(1), { wrapper: createWrapper() })
    await waitFor(() => expect(result.current.isError).toBe(true))
  })
})
