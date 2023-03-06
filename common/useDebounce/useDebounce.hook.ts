import { useState, useEffect } from 'react'

export const useDebounce = (effect, delay, deps) => {
  const [debouncedEffect, setDebouncedEffect] = useState(() => debounce(effect, delay))

  useEffect(() => {
    setDebouncedEffect(() => debounce(effect, delay))
  }, [effect, delay])

  useEffect(() => {
    return debouncedEffect()
  }, deps)
}

function debounce(func, delay) {
  let timeoutId
  return function (...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(this, args), delay)
  }
}
