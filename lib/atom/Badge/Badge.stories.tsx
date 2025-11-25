import type { Meta, StoryObj } from '@storybook/react-vite';

import { Badge, type IBadgeProps } from '../';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Atom/Badge',
  component: Badge,
  args: {
    label: 'Badge',
  },
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<IBadgeProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
