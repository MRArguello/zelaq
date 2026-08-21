import { useEffect, useState } from 'react'
import type { PropsWithChildren } from 'react'
import type { Preview } from '@storybook/react-vite'
import { withThemeByDataAttribute } from '@storybook/addon-themes'
import { DocsContainer as BaseDocsContainer } from '@storybook/addon-docs/blocks'
import type { DocsContainerProps } from '@storybook/addon-docs/blocks'
import { themes } from 'storybook/theming'
import { ZelaqProvider, useTheme } from '../src'
import type { ThemeMode } from '../src'

function SyncCanvasBackground({ children }: { children: React.ReactNode }) {
  const theme = useTheme()
  useEffect(() => {
    document.body.style.backgroundColor = theme.colors.background
  }, [theme.colors.background])
  return <>{children}</>
}

function readDocsTheme() {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? themes.dark : themes.light
}

function CustomDocsContainer(props: PropsWithChildren<DocsContainerProps>) {
  const [theme, setTheme] = useState(readDocsTheme)
  useEffect(() => {
    const observer = new MutationObserver(() => setTheme(readDocsTheme()))
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])
  return <BaseDocsContainer {...props} theme={theme} />
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: 'error'
    },

    options: {
      storySort: {
        order: ['Introduction', 'Components'],
      },
    },

    docs: {
      container: CustomDocsContainer,
    },
  },
  decorators: [
    withThemeByDataAttribute({
      themes: { light: 'light', dark: 'dark', system: 'system' },
      defaultTheme: 'light',
      attributeName: 'data-theme',
    }),
    (Story, context) => (
      <ZelaqProvider mode={context.globals.theme as ThemeMode}>
        <SyncCanvasBackground>
          <Story />
        </SyncCanvasBackground>
      </ZelaqProvider>
    ),
  ],
};

export default preview;
