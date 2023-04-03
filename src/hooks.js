import { useEffect, useState } from 'react'

export function useMediaQuery(mediaQueryString) {
    const [media, setMedia] = useState(window.matchMedia(mediaQueryString))

    useEffect(() => {
        const m = window.matchMedia(mediaQueryString)
        const handleMediaChange = () =>
            setMedia(window.matchMedia(mediaQueryString))
        m.addEventListener('change', handleMediaChange)
        return () => m.addEventListener('change', handleMediaChange)
    }, [mediaQueryString])

    return media
}