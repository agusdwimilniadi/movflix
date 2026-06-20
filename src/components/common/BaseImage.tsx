import { useState } from 'react'

interface BaseImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string
}

export function BaseImage({ fallback = '/no-image.jpg', onError, ...props }: BaseImageProps) {
  const [errored, setErrored] = useState(false)

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (!errored) {
      setErrored(true)
      ;(e.target as HTMLImageElement).src = fallback
    }
    onError?.(e)
  }

  return <img {...props} onError={handleError} />
}
