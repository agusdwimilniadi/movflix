import { MovieCardSkeleton } from './MovieCardSkeleton'

interface MovieGridSkeletonProps {
  count?: number
  showHero?: boolean
}

export function MovieGridSkeleton({ count = 18, showHero = false }: MovieGridSkeletonProps) {
  return (
    <div>
      {showHero && (
        <div className="h-[80vh] min-h-[500px] bg-movflix-gray animate-pulse" />
      )}

      <div className="max-w-screen-xl mx-auto px-4 pt-2 pb-6">
        <div className="h-6 w-32 bg-white/10 rounded animate-pulse mb-4 mt-2" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {Array.from({ length: count }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
