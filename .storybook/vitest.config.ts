import { defineProject } from 'vitest/config';

export default defineProject({
  test: {
    name: 'storybook',
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: [
      'stories/**/*.stories.@(js|jsx|ts|tsx|mdx)',
      '../lib/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    ],
  },
});
