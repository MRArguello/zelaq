const PX_PER_REM = 16

/** Web-only — theme values are stored as px-equivalent numbers; this formats them as rem for CSS so they scale with the browser/user font-size setting. RN has no rem concept and consumes the numbers directly. */
export function toRem(px: number): string {
    return `${px / PX_PER_REM}rem`
}
