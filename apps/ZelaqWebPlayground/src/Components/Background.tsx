import type { CSSProperties } from "react";
import type { Theme } from "zelaq-ui";

function BackgroundImage({ theme }: { theme: Theme }) {
    const BackgroundStyles: CSSProperties = {
        position: "fixed",
        inset: 0,
        zIndex: -1,
        background: theme.colors.backdrop
    }

    const backgroundImageStyles: CSSProperties = {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center",
        opacity: 0.55
    }

    const backgroundOverlayStyles: CSSProperties = {
        position: "absolute",
        inset: 0,
        background: `linear-gradient(
      "90deg",
    ${theme.colors.backdrop} 0%,
    ${theme.colors.backdrop} 45%,
    ${theme.colors.backdrop} 100%
    )`
    }

    return (<div style={BackgroundStyles} aria-hidden="true">
        <picture>
            {/* cdn.imgipsum.com never resolves — confirmed dead, not just blocked from one
                environment. picsum.photos/id/66 is a real, verified-reachable mountain-valley photo. */}
            <source
                media="(max-width: 767px)"
                srcSet="https://picsum.photos/id/190/400/900"
            />

            <img
                src="https://picsum.photos/id/190/1200/800"
                alt=""
                style={backgroundImageStyles}
            />
        </picture>

        <div style={backgroundOverlayStyles} />
    </div>)
}

export function PlaygroundBackground({ children, theme }: { children: React.ReactNode; theme: Theme }) {
    return (
        <div
            style={{
                height: '100vh',
                width: '100%',
                minWidth: '100vw',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                overflow: 'hidden'

            }}
        >
            <BackgroundImage theme={theme} />
            {children}
        </div>
    )
}
