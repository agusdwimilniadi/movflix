import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_TMDB_BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN}`,
    Accept: 'application/json',
  },
})

export const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL

export function getPosterUrl(path: string | null, size = 'w500'): string {
  if (!path) return '/no-image.png'
  return `${IMAGE_BASE_URL}/${size}${path}`
}

export function getBackdropUrl(path: string | null, size = 'w1280'): string {
  if (!path) return ''
  return `${IMAGE_BASE_URL}/${size}${path}`
}

export default api
