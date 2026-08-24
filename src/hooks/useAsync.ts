import { useEffect, useState, useCallback } from 'react'

interface UseAsyncState<T> {
  data: T | null
  error: Error | null
  isLoading: boolean
}

export const useAsync = <T,>(
  asyncFunction: () => Promise<T>,
  immediate = true
) => {
  const [state, setState] = useState<UseAsyncState<T>>({
    data: null,
    error: null,
    isLoading: false,
  })

  const execute = useCallback(async () => {
    setState({ data: null, error: null, isLoading: true })
    try {
      const response = await asyncFunction()
      setState({ data: response, error: null, isLoading: false })
      return response
    } catch (error) {
      setState({ data: null, error: error as Error, isLoading: false })
    }
  }, [asyncFunction])

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate])

  return { ...state, execute }
}
