import { useEffect, useRef } from 'react'
import { MovieCard } from './MovieCard'
import { MovieCardSkeleton } from './MovieCardSkeleton'
import type { Movie } from '../../types/movie'

interface MovieGridProps {
  movies: Movie[]
  hasNextPage: boolean
  isFetchingNextPage: boolean
  onLoadMore: () => void
}

export function MovieGrid({ movies, hasNextPage, isFetchingNextPage, onLoadMore }: MovieGridProps) {
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          onLoadMore()
        }
      },
      { rootMargin: '200px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage, onLoadMore])

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
        {isFetchingNextPage &&
          Array.from({
            length: (movies.length % 6 === 0 ? 0 : 6 - (movies.length % 6)) + 6,
          }).map((_, i) => <MovieCardSkeleton key={i} />)}
      </div>

      <div ref={sentinelRef} className="h-1" />
    </div>
  )
}
