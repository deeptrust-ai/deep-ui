import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs, type ITabsProps } from '../..';

const meta = {
  title: 'Molecule/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<ITabsProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
