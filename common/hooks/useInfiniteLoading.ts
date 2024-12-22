import { useEffect, useRef, useCallback } from 'react'
import { useAppDispatch } from '@/store'

interface UseInfiniteLoadingOptions {
  address?: string
  continuation?: string | null
  network?: string
}

export function useInfiniteLoading(
  endpoint: any,
  options: UseInfiniteLoadingOptions = {}
) {
  const { address, continuation, network } = options
  const dispatch = useAppDispatch()
  const observerRef = useRef<IntersectionObserver>()
  const elementRef = useRef<HTMLDivElement>(null)

  const callback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries
      if (entry.isIntersecting && continuation) {
        dispatch(endpoint({ address, continuation, network }))
      }
    },
    [address, continuation, dispatch, endpoint, network]
  )

  useEffect(() => {
    if (!elementRef.current) return

    observerRef.current = new IntersectionObserver(callback, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    })

    observerRef.current.observe(elementRef.current)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [callback])

  return { ref: elementRef }
} 