import type { Meta, StoryObj } from '@storybook/react-vite';

import { ContentWrapper, type IContentWrapperProps } from '../..';
import pkg from '../../../package.json';

const meta = {
  title: 'Atom/ContentWrapper',
  component: ContentWrapper,
  args: {
    title: 'Welcome to DeepUI',
    subtitle: 'Build beautiful UIs with ease',
    metaInfo: `Version ${pkg.version}`,
  },
  tags: ['autodocs'],
} satisfies Meta<IContentWrapperProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
