import type { StorybookConfig } from '@storybook/react-vite';
import { resolve } from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx|mdx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(config) {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@deeptrust/deep-ui': resolve(__dirname, '..', 'lib', 'main.ts'),
      // Support deep imports like '@deeptrust/deep-ui/atoms/Button'
      '^@deeptrust/deep-ui/(.*)$': resolve(__dirname, '..', 'lib') + '/$1',
    };
    return config;
  },
};
export default config;
