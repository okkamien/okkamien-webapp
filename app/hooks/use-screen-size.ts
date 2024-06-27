import {useEffect, useState} from 'react'

export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    screenWidth: 0,
    screenHeight: 0,
  })

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
      })
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return screenSize
}
