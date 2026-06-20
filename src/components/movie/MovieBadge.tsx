interface MovieBadgeProps {
  rating: number
}

export function MovieBadge({ rating }: MovieBadgeProps) {
  const score = Number(rating.toFixed(1))

  const colorClass =
    score >= 7
      ? 'bg-green-600'
      : score >= 5
        ? 'bg-yellow-600'
        : 'bg-red-700'

  return (
    <span
      className={`inline-flex items-center gap-0.5 ${colorClass} text-white text-xs font-bold px-1.5 py-0.5 rounded`}
    >
      ★ {score}
    </span>
  )
}
