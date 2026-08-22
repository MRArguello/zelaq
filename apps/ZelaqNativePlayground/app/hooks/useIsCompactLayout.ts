import { useWindowDimensions } from 'react-native'

export const EXPANDED_MIN_WIDTH = 768

export function useIsCompactLayout() {
    const { width, height } = useWindowDimensions()
    return !(width >= EXPANDED_MIN_WIDTH && width > height)
}
