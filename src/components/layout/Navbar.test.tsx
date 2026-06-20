import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import { Navbar } from './Navbar'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>{children}</MemoryRouter>
)

describe('Navbar', () => {
  it('should render the MovFlix logo', () => {
    render(<Navbar activeCategory="popular" onCategoryChange={vi.fn()} />, { wrapper })
    expect(screen.getByAltText('MovFlix')).toBeInTheDocument()
  })

  it('should render all category buttons', () => {
    render(<Navbar activeCategory="popular" onCategoryChange={vi.fn()} />, { wrapper })
    expect(screen.getAllByText('Now Playing').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Popular').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Top Rated').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Upcoming').length).toBeGreaterThan(0)
  })

  it('should render search input', () => {
    render(<Navbar activeCategory="popular" onCategoryChange={vi.fn()} />, { wrapper })
    expect(screen.getByPlaceholderText('Search movies...')).toBeInTheDocument()
  })

  it('should call onCategoryChange when a category button is clicked', async () => {
    const onCategoryChange = vi.fn()
    render(<Navbar activeCategory="popular" onCategoryChange={onCategoryChange} />, { wrapper })
    const buttons = screen.getAllByText('Top Rated')
    await userEvent.click(buttons[0])
    expect(onCategoryChange).toHaveBeenCalledWith('top_rated')
  })

  it('should update search input value as user types', async () => {
    render(<Navbar activeCategory="popular" onCategoryChange={vi.fn()} />, { wrapper })
    const input = screen.getByPlaceholderText('Search movies...')
    await userEvent.type(input, 'Avengers')
    expect(input).toHaveValue('Avengers')
  })
})
