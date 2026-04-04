import { useCallback, useRef, useState } from 'react'
import { toast } from 'sonner'
import { parseApiError, type ApiErrorInfo } from '@/shared/lib/apiError'

interface UseApiCallOptions {
  successMessage?: string
  errorMessage?: string
}

interface UseApiCallReturn<TData, TArgs extends unknown[]> {
  execute: (...args: TArgs) => Promise<TData | undefined>
  data: TData | undefined
  error: ApiErrorInfo | null
  isLoading: boolean
  reset: () => void
}

export function useApiCall<TData, TArgs extends unknown[] = []>(
  fn: (...args: TArgs) => Promise<TData>,
  options: UseApiCallOptions = {},
): UseApiCallReturn<TData, TArgs> {
  const [data, setData] = useState<TData | undefined>()
  const [error, setError] = useState<ApiErrorInfo | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const optionsRef = useRef(options)
  optionsRef.current = options

  const execute = useCallback(
    async (...args: TArgs) => {
      setIsLoading(true)
      setError(null)
      try {
        const result = await fn(...args)
        setData(result)
        if (optionsRef.current.successMessage) {
          toast.success(optionsRef.current.successMessage)
        }
        return result
      } catch (err) {
        const parsed = parseApiError(err)
        setError(parsed)
        toast.error(optionsRef.current.errorMessage ?? parsed.message)
        return undefined
      } finally {
        setIsLoading(false)
      }
    },
    [fn],
  )

  const reset = useCallback(() => {
    setData(undefined)
    setError(null)
    setIsLoading(false)
  }, [])

  return { execute, data, error, isLoading, reset }
}
