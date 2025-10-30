import type { StorybookConfig } from '@storybook/react-vite';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: [
    './stories/**/*.mdx',
    '../lib/**/*.stories.@(ts|tsx)',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
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
