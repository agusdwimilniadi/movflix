import api from './api'
import type { CategoryKey } from '../constants/categories'
import type { Movie, MovieDetail, Credits, VideosResponse, PaginatedResponse } from '../types/movie'

export async function fetchMovies(
  category: CategoryKey,
  page: number
): Promise<PaginatedResponse<Movie>> {
  const { data } = await api.get<PaginatedResponse<Movie>>(`/movie/${category}`, {
    params: { page },
  })
  return data
}

export async function searchMovies(
  query: string,
  page: number
): Promise<PaginatedResponse<Movie>> {
  const { data } = await api.get<PaginatedResponse<Movie>>('/search/movie', {
    params: { query, page },
  })
  return data
}

export async function fetchMovieDetail(id: number): Promise<MovieDetail> {
  const { data } = await api.get<MovieDetail>(`/movie/${id}`)
  return data
}

export async function fetchCredits(id: number): Promise<Credits> {
  const { data } = await api.get<Credits>(`/movie/${id}/credits`)
  return data
}

export async function fetchVideos(id: number): Promise<VideosResponse> {
  const { data } = await api.get<VideosResponse>(`/movie/${id}/videos`)
  return data
}
