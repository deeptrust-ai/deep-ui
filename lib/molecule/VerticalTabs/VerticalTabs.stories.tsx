import type { Meta, StoryObj } from '@storybook/react-vite';
import { VerticalTabs, type IVerticalTabsProps } from '../..';

const meta = {
  title: 'Molecule/Tabs',
  component: VerticalTabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<IVerticalTabsProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
