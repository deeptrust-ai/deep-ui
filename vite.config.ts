import { defineConfig } from 'vite';
import { extname, relative, resolve } from 'path';
import { fileURLToPath } from 'node:url';
import { glob } from 'glob';
import dts from 'vite-plugin-dts';
import react from '@vitejs/plugin-react';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

// https://vite.dev/config/
const isStorybookCommand = process.argv.some((arg) => arg.includes('storybook'));

export default defineConfig({
  plugins: [react(), !isStorybookCommand && dts({ include: ['lib'] }), libInjectCss()].filter(
    Boolean
  ),
  resolve: {
    // Map the package name to the local lib entry so bare imports like
    // `import { Button } from '@deeptrust/deep-ui'` resolve during dev.
    alias: [
      {
        find: '@deeptrust/deep-ui/styles.css',
        replacement: resolve(__dirname, 'lib', 'styles.css'),
      },
      { find: '@deeptrust/deep-ui', replacement: resolve(__dirname, 'lib', 'main.ts') },
      { find: /^@deeptrust\/deep-ui\/(.*)$/, replacement: resolve(__dirname, 'lib') + '/$1' },
    ],
  },
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'react',
        'react/jsx-runtime',
        /^frosted-ui(\/.*)?$/,
        /^@deeptrust\/deep-ui(\/.*)?$/,
      ],
      input: (() => {
        const entries = Object.fromEntries(
          glob
            .sync('lib/**/*.{ts,tsx}', {
              ignore: ['lib/**/*.d.ts'],
            })
            .map((file) => [
              // The name of the entry point
              // lib/nested/foo.ts becomes nested/foo
              relative('lib', file.slice(0, file.length - extname(file).length)),
              // The absolute path to the entry file
              // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
              fileURLToPath(new URL(file, import.meta.url)),
            ])
        );

        entries.styles = resolve(__dirname, 'lib/styles.css');

        return entries;
      })(),
      output: {
        assetFileNames: (assetInfo) =>
          assetInfo.name === 'styles.css' ? 'styles.css' : 'assets/[name][extname]',
        entryFileNames: '[name].js',
      },
    },
  },
});
