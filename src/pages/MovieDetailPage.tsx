import { useEffect } from 'react'
import { usePageTitle } from '../hooks/usePageTitle'
import { HiArrowLeft } from 'react-icons/hi2'
import { useParams, useNavigate } from 'react-router-dom'
import { useMovieDetail } from '../hooks/useMovieDetail'
import { ErrorMessage } from '../components/common/ErrorMessage'
import { MovieBadge } from '../components/movie/MovieBadge'
import { getPosterUrl, getBackdropUrl } from '../services/api'
import { BaseImage } from '../components/common/BaseImage'
import { formatDate, formatRuntime } from '../utils/formatDate'
import type { Video } from '../types/movie'

function getTrailer(videos: Video[]): Video | undefined {
  return (
    videos.find((v) => v.type === 'Trailer' && v.site === 'YouTube' && v.official) ??
    videos.find((v) => v.type === 'Trailer' && v.site === 'YouTube')
  )
}

export function MovieDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const movieId = Number(id)

  const { movie, credits, videos, isLoading, isError, refetch } = useMovieDetail(movieId)

  usePageTitle(movie?.title)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [movieId])

  if (isLoading) {
    return (
      <div className="min-h-screen animate-pulse">
        <div className="h-[50vh] min-h-[320px]" />
        <div className="max-w-screen-xl mx-auto px-4 -mt-32 relative z-10 pb-16">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0 w-48 md:w-64">
              <div className="w-full aspect-[2/3] rounded-lg bg-white/10" />
            </div>
            <div className="flex-1 pt-2 md:pt-8 space-y-3">
              <div className="h-9 w-2/3 bg-white/10 rounded" />
              <div className="h-4 w-1/4 bg-white/10 rounded" />
              <div className="flex gap-2 pt-1">
                <div className="h-6 w-12 bg-white/10 rounded" />
                <div className="h-6 w-28 bg-white/10 rounded" />
                <div className="h-6 w-16 bg-white/10 rounded" />
              </div>
              <div className="flex gap-2 pt-1">
                <div className="h-6 w-20 bg-white/10 rounded-full" />
                <div className="h-6 w-16 bg-white/10 rounded-full" />
                <div className="h-6 w-24 bg-white/10 rounded-full" />
              </div>
              <div className="space-y-2 pt-1 max-w-2xl">
                <div className="h-4 bg-white/10 rounded w-full" />
                <div className="h-4 bg-white/10 rounded w-5/6" />
                <div className="h-4 bg-white/10 rounded w-4/6" />
              </div>
              <div className="h-4 w-48 bg-white/10 rounded" />
              <div className="pt-2">
                <div className="h-5 w-12 bg-white/10 rounded mb-3" />
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <div className="w-full aspect-square rounded-full bg-white/10" />
                      <div className="h-3 bg-white/10 rounded w-full" />
                      <div className="h-3 bg-white/10 rounded w-3/4" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isError || !movie) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ErrorMessage onRetry={refetch} />
      </div>
    )
  }

  const director = credits?.crew.find((c) => c.job === 'Director')
  const mainCast = credits?.cast.slice(0, 6) ?? []
  const trailer = videos ? getTrailer(videos.results) : undefined

  return (
    <div className="min-h-screen">
      <div
        className="relative h-[50vh] min-h-[320px] bg-cover bg-center"
        style={{
          backgroundImage: movie.backdrop_path
            ? `url(${getBackdropUrl(movie.backdrop_path)})`
            : undefined,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-movflix-dark via-black/30 to-black/60" />
      </div>

      <div className="max-w-screen-xl mx-auto px-4 -mt-32 relative z-10 pb-16">
        <div className="pt-20 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-300 hover:text-white text-sm transition-colors"
          >
            <HiArrowLeft /> Back
          </button>
        </div>
        <div className="flex flex-row gap-4 md:gap-8">
          <div className="flex-shrink-0">
            <BaseImage
              src={getPosterUrl(movie.poster_path, 'w342')}
              alt={movie.title}
              className="w-28 sm:w-40 md:w-64 rounded-lg shadow-2xl"
            />
          </div>

          <div className="flex-1 pt-2 md:pt-8">
            <h1 className="text-xl sm:text-2xl md:text-4xl font-black text-white mb-2">{movie.title}</h1>

            {movie.tagline && (
              <p className="text-gray-400 italic mb-3 text-sm">{movie.tagline}</p>
            )}

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <MovieBadge rating={movie.vote_average} />
              <span className="text-gray-400 text-sm">{formatDate(movie.release_date)}</span>
              {movie.runtime && (
                <span className="text-gray-400 text-sm">{formatRuntime(movie.runtime)}</span>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-white/10 rounded-full text-xs text-gray-200"
                >
                  {genre.name}
                </span>
              ))}
            </div>

          </div>
        </div>

        <p className="text-gray-300 leading-relaxed mb-4 max-w-2xl mt-6">{movie.overview}</p>

        {director && (
          <p className="text-sm text-gray-400 mb-2">
            <span className="text-white font-semibold">Director:</span> {director.name}
          </p>
        )}

        {mainCast.length > 0 && (
          <div className="mt-8 mb-6">
            <h3 className="text-white font-semibold mb-3">Cast</h3>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {mainCast.map((actor) => (
                <div key={actor.id} className="text-center">
                  <div className="w-full aspect-square rounded-full overflow-hidden bg-movflix-gray mb-1">
                    <BaseImage
                      src={getPosterUrl(actor.profile_path, 'w185')}
                      alt={actor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs text-white font-medium leading-tight">{actor.name}</p>
                  <p className="text-xs text-gray-400 leading-tight line-clamp-1">
                    {actor.character}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {trailer && (
          <div className="mt-4">
            <h3 className="text-white font-semibold mb-3">Trailer</h3>
            <div className="aspect-video w-full max-w-2xl rounded-lg overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={trailer.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
