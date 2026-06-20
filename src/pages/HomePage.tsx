import { useCallback, useEffect, useMemo, useState } from 'react'
import { usePageTitle } from '../hooks/usePageTitle'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { PiFilmSlateBold } from 'react-icons/pi'
import { useMovies } from '../hooks/useMovies'
import { useSearchMovies } from '../hooks/useSearchMovies'
import { useDebounce } from '../hooks/useDebounce'
import { useLayout } from '../components/layout/LayoutContext'
import { MovieGrid } from '../components/movie/MovieGrid'
import { MovieGridSkeleton } from '../components/movie/MovieGridSkeleton'
import { ErrorMessage } from '../components/common/ErrorMessage'
import { getBackdropUrl } from '../services/api'
import type { Movie } from '../types/movie'

function HeroBanner({ movies }: { movies: Movie[] }) {
  const [current, setCurrent] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % movies.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [movies.length])

  const movie = movies[current]

  return (
    <div className="relative h-[80vh] min-h-[500px] overflow-hidden bg-movflix-dark">
      {movies.map((m, i) => (
        <div
          key={m.id}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
          style={{
            backgroundImage: m.backdrop_path ? `url(${getBackdropUrl(m.backdrop_path)})` : undefined,
            opacity: i === current ? 1 : 0,
          }}
        />
      ))}

      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to bottom, #141414 0%, transparent 30%, transparent 50%, #141414 100%),
            linear-gradient(to right, rgba(0,0,0,0.75) 0%, transparent 60%)
          `,
        }}
      />

      <div className="relative z-10 h-full flex flex-col justify-end max-w-screen-xl mx-auto px-4 pb-14 w-full">
        <h1
          className="text-4xl md:text-5xl font-black text-white leading-tight mb-2 max-w-2xl cursor-pointer hover:text-gray-200 transition-colors"
          onClick={() => navigate(`/movie/${movie.id}`)}
        >
          {movie.title}
        </h1>
        <p className="text-gray-300 text-sm md:text-base max-w-lg line-clamp-3 mb-6">
          {movie.overview}
        </p>

        <div className="flex items-center gap-2">
          {movies.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === current ? 'w-8 bg-movflix-red' : 'w-4 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export function HomePage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const debouncedQuery = useDebounce(query, 500)
  const { activeCategory } = useLayout()

  const browseQuery = useMovies(activeCategory)
  const searchQuery = useSearchMovies(debouncedQuery)

  const isSearchMode = debouncedQuery.trim().length > 0
  const activeQuery = isSearchMode ? searchQuery : browseQuery

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [activeCategory])

  const pageTitle = useMemo(() => {
    if (isSearchMode) return `Search: "${debouncedQuery}"`
    return activeCategory.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  }, [isSearchMode, debouncedQuery, activeCategory])

  usePageTitle(pageTitle)

  const movies = useMemo(() => {
    const all = activeQuery.data?.pages.flatMap((p) => p.results) ?? []
    return all.filter((m, index) => all.findIndex((x) => x.id === m.id) === index)
  }, [activeQuery.data])
  const heroMovies = browseQuery.data?.pages[0]?.results.slice(0, 3) ?? []

  const handleLoadMore = useCallback(() => {
    if (activeQuery.hasNextPage && !activeQuery.isFetchingNextPage) {
      activeQuery.fetchNextPage()
    }
  }, [activeQuery])

  if (activeQuery.isLoading) {
    return <MovieGridSkeleton count={18} showHero={!isSearchMode} />
  }

  if (activeQuery.isError) {
    return (
      <div className="pt-24">
        <ErrorMessage onRetry={() => activeQuery.refetch()} />
      </div>
    )
  }

  return (
    <div>
      {!isSearchMode && heroMovies.length > 0 && <HeroBanner movies={heroMovies} />}

      <div className="max-w-screen-xl mx-auto px-4 pt-2 pb-6">
        {isSearchMode && (
          <h2 className="text-xl font-semibold mb-4 pt-20 text-gray-200">
            Results for &ldquo;{debouncedQuery}&rdquo;
          </h2>
        )}
        {!isSearchMode && (
          <h2 className="text-xl font-semibold mb-4 text-gray-200">
            {activeCategory.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
          </h2>
        )}

        {movies.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <PiFilmSlateBold className="text-movflix-gray w-24 h-24" />
            <p className="text-white text-xl font-semibold">No movies found</p>
            <p className="text-gray-400 text-sm max-w-xs">
              We couldn&apos;t find any results for &ldquo;{debouncedQuery}&rdquo;. Try a different keyword.
            </p>
          </div>
        ) : (
          <MovieGrid
            movies={movies}
            hasNextPage={activeQuery.hasNextPage}
            isFetchingNextPage={activeQuery.isFetchingNextPage}
            onLoadMore={handleLoadMore}
          />
        )}
      </div>
    </div>
  )
}
