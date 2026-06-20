import { useQueries } from '@tanstack/react-query'
import { fetchMovieDetail, fetchCredits, fetchVideos } from '../services/movieService'

export function useMovieDetail(id: number) {
  const results = useQueries({
    queries: [
      {
        queryKey: ['movie', id],
        queryFn: () => fetchMovieDetail(id),
        enabled: !!id,
      },
      {
        queryKey: ['credits', id],
        queryFn: () => fetchCredits(id),
        enabled: !!id,
      },
      {
        queryKey: ['videos', id],
        queryFn: () => fetchVideos(id),
        enabled: !!id,
      },
    ],
  })

  const [detailQuery, creditsQuery, videosQuery] = results

  const isLoading = results.some((r) => r.isLoading)
  const isError = results.some((r) => r.isError)

  return {
    movie: detailQuery.data,
    credits: creditsQuery.data,
    videos: videosQuery.data,
    isLoading,
    isError,
    refetch: () => results.forEach((r) => r.refetch()),
  }
}
