import { PiWarningCircleBold } from 'react-icons/pi'
import { Button } from './Button'

interface ErrorMessageProps {
  message?: string
  onRetry?: () => void
}

export function ErrorMessage({
  message = 'Something went wrong. Please try again.',
  onRetry,
}: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <PiWarningCircleBold className="w-16 h-16 text-movflix-red" />
      <p className="text-gray-400 max-w-sm">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="primary" size="sm">
          Try Again
        </Button>
      )}
    </div>
  )
}
