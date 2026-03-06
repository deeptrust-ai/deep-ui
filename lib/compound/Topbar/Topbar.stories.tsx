import type { Meta, StoryObj } from '@storybook/react-vite';

import { Topbar } from '../..';

const meta = {
  title: 'Compound/Topbar',
  component: Topbar,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    organizations: [
      { id: 'org-1', name: 'Organization 1' },
      { id: 'org-2', name: 'Organization 2' },
      { id: 'org-3', name: 'Organization 3' },
    ],
    workspaces: [
      { id: 'ws-1', name: 'Workspace 1' },
      { id: 'ws-2', name: 'Workspace 2' },
      { id: 'ws-3', name: 'Workspace 3' },
    ],
    userName: 'Jane Doe',
    userPfp: 'https://i.pravatar.cc/150?img=70',
  },
  tags: ['autodocs'],
} satisfies Meta<React.ComponentProps<typeof Topbar>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
