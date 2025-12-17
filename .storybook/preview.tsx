import type { Preview } from '@storybook/react-vite';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import '../lib/styles.css';

const preview: Preview = {
  decorators: [
    (Story) => (
      <Theme
        appearance="light"
        accentColor="crimson"
        grayColor="gray"
        style={{ position: 'relative' }}
      >
        <Story />
      </Theme>
    ),
  ],
};

export default preview;

export const parameters = {
  // actions: { argTypesRegex: '^on[A-Z].*' },

  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },

  a11y: {
    // 'todo' - show a11y violations in the test UI only
    // 'error' - fail CI on a11y violations
    // 'off' - skip a11y checks entirely
    test: 'todo',
  },
};
