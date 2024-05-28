import {useEffect, useRef, useState} from 'react'

export const useScrollRef = () => {
  const scrollRef = useRef<HTMLElement>()
  const [scrollToElement, setScrollToElement] = useState<HTMLElement>()

  useEffect(() => {
    setScrollToElement(scrollRef.current)
  }, [scrollRef.current])

  return {
    scrollRef,
    scrollToElement,
  }
}
