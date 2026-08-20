/** Web-only — RN's fontFamily has no fallback-chain concept, it just falls back to the system font on its own. */
export function withFontFallback(fontFamily: string): string {
    return `${fontFamily}, system-ui, -apple-system, sans-serif`
}
