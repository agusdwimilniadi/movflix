import { createContext, useContext } from 'react'
import { DEFAULT_CATEGORY } from '../../constants/categories'
import type { CategoryKey } from '../../constants/categories'

interface LayoutContextValue {
  activeCategory: CategoryKey
  setActiveCategory: (cat: CategoryKey) => void
}

export const LayoutContext = createContext<LayoutContextValue>({
  activeCategory: DEFAULT_CATEGORY,
  setActiveCategory: () => {},
})

export function useLayout() {
  return useContext(LayoutContext)
}
