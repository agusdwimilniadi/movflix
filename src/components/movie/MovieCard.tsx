import { Link } from 'react-router-dom'
import { getPosterUrl } from '../../services/api'
import { formatYear } from '../../utils/formatDate'
import { MovieBadge } from './MovieBadge'
import { BaseImage } from '../common/BaseImage'
import type { Movie } from '../../types/movie'

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  console.log({movie})
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group relative block rounded-md overflow-hidden bg-movflix-gray cursor-pointer"
      aria-label={movie.title}
    >
      <div className="aspect-[2/3] overflow-hidden">
        <BaseImage
          src={getPosterUrl(movie.poster_path)}
          alt={movie.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
        <h3 className="text-white font-semibold text-sm leading-tight line-clamp-2 mb-1">
          {movie.title}
        </h3>
        <div className="flex items-center gap-2">
          <MovieBadge rating={movie.vote_average} />
          <span className="text-gray-300 text-xs">{formatYear(movie.release_date)}</span>
        </div>
      </div>

      <div className="absolute top-2 right-2 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
        <MovieBadge rating={movie.vote_average} />
      </div>
    </Link>
  )
}
