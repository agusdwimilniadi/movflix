export type CategoryKey = 'now_playing' | 'popular' | 'top_rated' | 'upcoming'

export interface Category {
  key: CategoryKey
  label: string
}

export const CATEGORIES: Category[] = [
  { key: 'now_playing', label: 'Now Playing' },
  { key: 'popular', label: 'Popular' },
  { key: 'top_rated', label: 'Top Rated' },
  { key: 'upcoming', label: 'Upcoming' },
]

export const DEFAULT_CATEGORY: CategoryKey = 'popular'
