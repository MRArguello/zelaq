import * as React from 'react';
import type { CSSProperties } from 'react';
import type { StackProps } from './Stack.types';
import { useTheme } from '../../theme';
import { toRem } from '../../internal/toRem';

type StackElement =
  | 'div'
  | 'section'
  | 'article'
  | 'header'
  | 'footer'
  | 'nav'
  | 'main'
  | 'aside';

type WebStackProps = Omit<StackProps, 'style'> &
  Omit<React.HTMLAttributes<HTMLElement>, 'style' | 'children'> & {
    style?: CSSProperties;
    /** Overrides the HTML element rendered (defaults to 'div'). */
    as?: StackElement;
  };

const alignItemsMap: Record<
  NonNullable<StackProps['align']>,
  CSSProperties['alignItems']
> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
};

const justifyContentMap: Record<
  NonNullable<StackProps['justify']>,
  CSSProperties['justifyContent']
> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
};

export function Stack({
  children,
  gap = 'base',
  align = 'stretch',
  justify = 'start',
  as,
  style,
  testID,
  ...rest
}: WebStackProps) {
  const theme = useTheme();
  const Element = as ?? 'div';

  const stackStyle: CSSProperties = {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: toRem(theme.space[gap]),
    alignItems: alignItemsMap[align],
    justifyContent: justifyContentMap[justify],
  };

  return (
    <Element data-testid={testID} style={{ ...stackStyle, ...style }} {...rest}>
      {children}
    </Element>
  );
}
