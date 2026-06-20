import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchMovies } from '../services/movieService'
import type { CategoryKey } from '../constants/categories'

export function useMovies(category: CategoryKey) {
  return useInfiniteQuery({
    queryKey: ['movies', category],
    queryFn: ({ pageParam }) => fetchMovies(category, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
  })
}
