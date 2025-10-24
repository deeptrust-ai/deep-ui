import type { StorybookConfig } from '@storybook/react-vite';
import { resolve } from 'path';

const config: StorybookConfig = {
  stories: ['**/*.mdx', '**/*.stories.@(ts|tsx|mdx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
  ],
  core: {
    builder: '@storybook/builder-vite',
  },
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(config) {
    const base = Array.isArray(config.resolve?.alias)
      ? Object.fromEntries(
          (config.resolve!.alias as Array<any>).map((a) => [a.find, a.replacement])
        )
      : config.resolve?.alias || {};

    config.resolve = config.resolve || {};

    config.resolve.alias = {
      ...base,
      '@deeptrust/deep-ui/styles.css': resolve(__dirname, '..', 'lib', 'styles.css'),
      '@deeptrust/deep-ui': resolve(__dirname, '..', 'lib', 'main.ts'),
    };
    return config;
  },
};
export default config;
