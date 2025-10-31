import type { Meta, StoryObj } from '@storybook/react';

import { Header, type IHeaderProps } from '..';
import pkg from '../../../package.json';

const meta = {
  title: 'Atom/Header',
  component: Header,
  parameters: {
    layout: 'centered',
  },
  args: {
    title: 'Welcome to DeepUI',
    subtitle: 'Build beautiful UIs with ease',
    metaInfo: `Version ${pkg.version}`,
  },
  tags: ['autodocs'],
} satisfies Meta<IHeaderProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
