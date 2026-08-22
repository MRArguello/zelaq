import { useReduceMotion } from '../theme'

/** Whether a component should actually animate — combines its own `animated` prop with the resolved ZelaqProvider reduceMotion setting. */
export function useMotionEnabled(animated: boolean = true): boolean {
    const reduceMotion = useReduceMotion()
    return animated && !reduceMotion
}
