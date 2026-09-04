import * as React from 'react';
import type { CSSProperties } from 'react';
import type { BoxProps } from './Box.types';

type BoxElement =
  | 'div'
  | 'section'
  | 'article'
  | 'header'
  | 'footer'
  | 'nav'
  | 'main'
  | 'aside';

type WebBoxProps = Omit<BoxProps, 'style'> &
  Omit<React.HTMLAttributes<HTMLElement>, 'style' | 'children'> & {
    style?: CSSProperties;
    /** Overrides the HTML element rendered (defaults to 'div'). */
    as?: BoxElement;
  };

export function Box({ children, style, testID, as, ...rest }: WebBoxProps) {
  const Element = as ?? 'div';

  return (
    <Element
      data-testid={testID}
      style={{ boxSizing: 'border-box', ...style }}
      {...rest}
    >
      {children}
    </Element>
  );
}
