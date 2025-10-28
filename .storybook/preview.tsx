import type { Preview } from '@storybook/react';
import { Theme } from 'frosted-ui';
import '../lib/styles.css';

const preview: Preview = {
  decorators: [
    (Story) => (
      <Theme
        appearance="light"
        accentColor="violet"
        grayColor="gray"
        dangerColor="red"
        successColor="green"
        warningColor="yellow"
        infoColor="blue"
      >
        <div style={{ position: 'relative' }}>
          <Story />
        </div>
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
