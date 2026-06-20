import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import { CATEGORIES } from '../../constants/categories'
import type { CategoryKey } from '../../constants/categories'

interface NavbarProps {
  activeCategory: CategoryKey
  onCategoryChange: (category: CategoryKey) => void
}

export function Navbar({ activeCategory, onCategoryChange }: NavbarProps) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [searchValue, setSearchValue] = useState(searchParams.get('q') ?? '')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
    if (value.trim()) {
      navigate(`/?q=${encodeURIComponent(value.trim())}`)
    } else {
      navigate('/')
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${scrolled ? 'bg-movflix-dark' : 'bg-gradient-to-b from-black/80 to-transparent'}`}
    >
      <div className="max-w-screen-xl mx-auto px-4 py-5 flex items-center gap-6">
        <Link to="/" className="flex-shrink-0" onClick={() => setSearchValue('')}>
          <img src="/logo.png" alt="MovFlix" className="h-9 w-auto" />
        </Link>

        <div className="hidden md:flex items-center gap-1 flex-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => {
                onCategoryChange(cat.key)
                setSearchValue('')
                navigate('/')
              }}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                activeCategory === cat.key && !searchValue
                  ? 'text-white bg-white/10'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2 bg-black/40 border border-white/20 rounded px-3 py-1.5 w-48 focus-within:w-64 transition-all duration-300">
          <HiMagnifyingGlass className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search movies..."
            value={searchValue}
            onChange={handleSearch}
            className="bg-transparent text-white text-sm placeholder-gray-400 outline-none w-full"
          />
        </div>
      </div>

      <div className="md:hidden flex items-center gap-1 px-4 pb-2 overflow-x-auto scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => {
              onCategoryChange(cat.key)
              setSearchValue('')
              navigate('/')
            }}
            className={`flex-shrink-0 px-3 py-1 rounded text-xs font-medium transition-colors ${
              activeCategory === cat.key && !searchValue
                ? 'text-white bg-white/10'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </nav>
  )
}
