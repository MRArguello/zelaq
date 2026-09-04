import * as React from 'react';
import type { CSSProperties } from 'react';
import type { CardProps } from './Card.types';
import { useTheme } from '../../theme';
import { getCardTokens } from './Card.theme';
import { toRem } from '../../internal/toRem';

type CardElement =
  | 'div'
  | 'section'
  | 'article'
  | 'header'
  | 'footer'
  | 'nav'
  | 'main'
  | 'aside';

type WebCardProps = Omit<CardProps, 'style'> &
  Omit<React.HTMLAttributes<HTMLElement>, 'style' | 'children'> & {
    style?: CSSProperties;
    /** Overrides the HTML element rendered (defaults to 'div'). */
    as?: CardElement;
  };

export function Card({
  children,
  variant = 'subtle',
  as,
  style,
  testID,
  ...rest
}: WebCardProps) {
  const theme = useTheme();
  const tokens = getCardTokens(variant, theme);
  const Element = as ?? 'div';

  const cardStyle: CSSProperties = {
    boxSizing: 'border-box',
    backgroundColor: tokens.container.backgroundColor,
    borderRadius: tokens.container.borderRadius,
    border: `${tokens.container.borderWidth}px solid ${tokens.container.borderColor}`,
    padding: toRem(tokens.container.padding),
    boxShadow: tokens.shadow
      ? `${tokens.shadow.offsetX}px ${tokens.shadow.offsetY}px ${tokens.shadow.blurRadius}px ${tokens.shadow.color}`
      : undefined,
  };

  return (
    <Element data-testid={testID} style={{ ...cardStyle, ...style }} {...rest}>
      {children}
    </Element>
  );
}
