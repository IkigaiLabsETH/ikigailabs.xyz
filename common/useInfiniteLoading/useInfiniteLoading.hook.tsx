import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import { useAppDispatch } from '../redux/store'

export const useInfiniteLoading = (query: any) => {
  const dispatch = useAppDispatch()
  const { ref, inView } = useInView({
    threshold: 1.0,
  })

  useEffect(() => {
    inView && dispatch(query)
  }, [inView])

  return { ref, inView }
}
