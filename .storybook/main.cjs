const { dirname, resolve } = require('node:path');

const getAbsolutePath = (packageName) => dirname(require.resolve(`${packageName}/package.json`));

/** @type {import('@storybook/react-vite').StorybookConfig} */
const config = {
  stories: ['./stories/**/*.mdx', '../lib/**/*.stories.@(ts|tsx)'],
  managerHead: (head) => `
    ${head}
    <script>
      (function() {
        var searchParams = new URLSearchParams(window.location.search);
        if (!searchParams.has('path') && !searchParams.has('id')) {
          window.location.replace(window.location.pathname + '?path=/docs/deepui-dev--docs');
        }
      })();
    </script>
  `,
  addons: [
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-vitest'),
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
      ? Object.fromEntries(config.resolve.alias.map((a) => [a.find, a.replacement]))
      : config.resolve?.alias || {};

    config.resolve = config.resolve || {};

    config.resolve.alias = {
      ...base,
      '@deeptrust-ai/deep-ui/styles.css': resolve(__dirname, '..', 'lib', 'styles.css'),
      '@deeptrust-ai/deep-ui': resolve(__dirname, '..', 'lib', 'main.ts'),
    };
    return config;
  },
};
module.exports = config;
