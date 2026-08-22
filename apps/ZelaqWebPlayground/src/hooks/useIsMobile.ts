import { useEffect, useState } from 'react'

export const MOBILE_QUERY = '(max-width: 767px)'

export function useIsMobile() {
    const [isMobile, setIsMobile] = useState(() => window.matchMedia(MOBILE_QUERY).matches)

    useEffect(() => {
        const query = window.matchMedia(MOBILE_QUERY)
        const listener = () => setIsMobile(query.matches)
        query.addEventListener('change', listener)
        return () => query.removeEventListener('change', listener)
    }, [])

    return isMobile
}
