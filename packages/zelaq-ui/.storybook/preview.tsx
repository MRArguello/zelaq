import type { Preview } from '@storybook/react-vite'
import { ZelaqProvider } from '../src'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'error'
    },

    options: {
      // 'Introduction' is the landing page — keep it first regardless of alphabetical order.
      storySort: {
        order: ['Introduction', 'Components'],
      },
    },
  },
  decorators: [
    (Story) => (
      <ZelaqProvider>
        <Story />
      </ZelaqProvider>
    ),
  ],
};

export default preview;
