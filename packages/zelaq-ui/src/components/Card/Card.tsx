import * as React from 'react'
import type { CSSProperties } from 'react'
import type { CardProps } from './Card.types'
import { useTheme } from '../../theme'
import { getCardTokens } from './Card.theme'
import { toRem } from '../../internal/toRem'

type WebCardProps = Omit<CardProps, 'style'> &
    Omit<React.HTMLAttributes<HTMLDivElement>, 'style' | 'children'> & {
        style?: CSSProperties
    }

export function Card({ children, variant = 'subtle', style, testID, ...rest }: WebCardProps) {
    const theme = useTheme()
    const tokens = getCardTokens(variant, theme)

    const cardStyle: CSSProperties = {
        backgroundColor: tokens.container.backgroundColor,
        borderRadius: tokens.container.borderRadius,
        border: `${tokens.container.borderWidth}px solid ${tokens.container.borderColor}`,
        padding: toRem(tokens.container.padding),
        boxShadow: tokens.shadow
            ? `${tokens.shadow.offsetX}px ${tokens.shadow.offsetY}px ${tokens.shadow.blurRadius}px ${tokens.shadow.color}`
            : undefined,
    }

    return (
        <div data-testid={testID} style={{ ...cardStyle, ...style }} {...rest}>
            {children}
        </div>
    )
}
