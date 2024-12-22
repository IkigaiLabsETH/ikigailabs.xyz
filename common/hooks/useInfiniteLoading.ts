import { useCallback, useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

interface UseInfiniteLoadingOptions<T> {
  fetchItems: (cursor?: string) => Promise<{
    items: T[]
    nextCursor?: string
    hasMore: boolean
  }>
  initialItems?: T[]
  threshold?: number
  rootMargin?: string
}

export function useInfiniteLoading<T>({
  fetchItems,
  initialItems = [],
  threshold = 0.5,
  rootMargin = '0px',
}: UseInfiniteLoadingOptions<T>) {
  const [items, setItems] = useState<T[]>(initialItems)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const cursor = useRef<string | undefined>(undefined)
  const { ref, inView } = useInView({ threshold, rootMargin })

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return

    setIsLoading(true)
    setError(null)

    try {
      const { items: newItems, nextCursor, hasMore: moreItems } = await fetchItems(cursor.current)
      setItems((prevItems) => [...prevItems, ...newItems])
      cursor.current = nextCursor
      setHasMore(moreItems)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load items'))
    } finally {
      setIsLoading(false)
    }
  }, [fetchItems, isLoading, hasMore])

  useEffect(() => {
    if (inView) {
      loadMore()
    }
  }, [inView, loadMore])

  return {
    items,
    isLoading,
    error,
    hasMore,
    loadMore,
    ref,
  }
} 