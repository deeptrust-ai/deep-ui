import { AcornIcon, GearFineIcon, UserCircleIcon } from '@phosphor-icons/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentPropsWithoutRef, ElementType } from 'react';
import { forwardRef } from 'react';

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
    links: [
      {
        anchorProps: { href: '/' },
        icon: AcornIcon,
        label: 'Dashboard',
        selected: true,
      },
      {
        anchorProps: { href: '/issues' },
        icon: AcornIcon,
        label: 'Issues',
      },
      {
        anchorProps: { href: '/metrics' },
        icon: AcornIcon,
        label: 'Usage',
      },
    ],
    userName: 'Jane Doe',
    userPfp: 'https://i.pravatar.cc/150?img=70',
  },
  tags: ['autodocs'],
} satisfies Meta<React.ComponentProps<typeof Topbar>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/**
 * Mock anchor component that simulates a router Link (e.g. TanStack Router).
 * Forwards refs so it works with Radix `asChild`.
 */
const MockRouterLink: ElementType = forwardRef<
  HTMLAnchorElement,
  ComponentPropsWithoutRef<'a'> & { to?: string }
>(({ to, ...props }, ref) => <a ref={ref} href={to ?? '#'} {...props} />);
(MockRouterLink as React.FC).displayName = 'MockRouterLink';

export const WithAnchorComponent: Story = {
  args: {
    userMenuItems: [
      {
        label: 'User Account',
        anchorComponent: MockRouterLink,
        anchorProps: { to: '/user' },
        shortcut: '⌘ U',
        icon: UserCircleIcon,
      },
      {
        label: 'Settings',
        anchorComponent: MockRouterLink,
        anchorProps: { to: '/settings' },
        shortcut: '⌘ ,',
        icon: GearFineIcon,
      },
    ],
    logout: {
      anchorComponent: MockRouterLink,
      anchorProps: { to: '/logout' },
    },
  },
};
