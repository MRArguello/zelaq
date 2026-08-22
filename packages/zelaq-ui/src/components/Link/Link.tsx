import * as React from 'react'
import type { CSSProperties } from 'react'
import type { LinkProps } from './Link.types'
import { useTheme } from '../../theme'
import { getLinkTokens } from './Link.theme'
import { withFontFallback } from '../../internal/withFontFallback'
import { toRem } from '../../internal/toRem'

type WebLinkProps = Omit<LinkProps, 'style' | 'onPress'> & {
    onPress?: React.MouseEventHandler<HTMLAnchorElement>
    style?: CSSProperties
}

export function Link({ href, children, onPress, style, testID, accessibilityLabel }: WebLinkProps) {
    const theme = useTheme()
    const tokens = getLinkTokens(theme)

    const linkStyle: CSSProperties = {
        color: tokens.color,
        fontFamily: withFontFallback(tokens.fontFamily),
        fontSize: toRem(tokens.fontSize),
        fontWeight: tokens.fontWeight,
        lineHeight: toRem(tokens.lineHeight),
        textDecoration: 'underline',
    }

    return (
        <a
            href={href}
            onClick={onPress}
            data-testid={testID}
            aria-label={accessibilityLabel}
            style={{ ...linkStyle, ...style }}
        >
            {children}
        </a>
    )
}
