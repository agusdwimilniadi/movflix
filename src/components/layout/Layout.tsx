import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { LayoutContext } from './LayoutContext'
import { BackToTop } from '../common/BackToTop'
import { DEFAULT_CATEGORY } from '../../constants/categories'
import type { CategoryKey } from '../../constants/categories'

export function Layout() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>(DEFAULT_CATEGORY)

  return (
    <LayoutContext.Provider value={{ activeCategory, setActiveCategory }}>
      <div className="min-h-screen bg-movflix-dark text-white">
        <Navbar activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
        <main>
          <Outlet />
        </main>
        <BackToTop />
      </div>
    </LayoutContext.Provider>
  )
}
