import { describe, it, expect } from 'vitest'
import { formatDate, formatYear, formatRuntime } from './formatDate'

describe('formatDate', () => {
  it('should return formatted month and year for a valid date string', () => {
    expect(formatDate('2024-06-15')).toBe('June 2024')
  })

  it('should return N/A for an empty string', () => {
    expect(formatDate('')).toBe('N/A')
  })

  it('should handle date at beginning of year', () => {
    expect(formatDate('2023-01-01')).toBe('January 2023')
  })

  it('should handle date at end of year', () => {
    expect(formatDate('2023-12-31')).toBe('December 2023')
  })
})

describe('formatYear', () => {
  it('should return the year as a string for a valid date string', () => {
    expect(formatYear('2024-06-15')).toBe('2024')
  })

  it('should return N/A for an empty string', () => {
    expect(formatYear('')).toBe('N/A')
  })

  it('should return correct year for older dates', () => {
    expect(formatYear('1994-09-23')).toBe('1994')
  })
})

describe('formatRuntime', () => {
  it('should return hours and minutes for runtime over 60 minutes', () => {
    expect(formatRuntime(148)).toBe('2h 28m')
  })

  it('should return only minutes when runtime is under 60', () => {
    expect(formatRuntime(45)).toBe('45m')
  })

  it('should return N/A for null runtime', () => {
    expect(formatRuntime(null)).toBe('N/A')
  })

  it('should return N/A for zero runtime', () => {
    expect(formatRuntime(0)).toBe('N/A')
  })

  it('should return exactly 1h 0m for 60 minutes', () => {
    expect(formatRuntime(60)).toBe('1h 0m')
  })
})
