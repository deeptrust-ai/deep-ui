import type { Meta, StoryObj } from '@storybook/react-vite';

import { Breadcrumbs, type IBreadcrumbsProps } from '../..';
import { ALL_WORKSPACES_ID } from './constants';

const defaultPages: NonNullable<IBreadcrumbsProps['pages']> = [
  {
    name: 'Projects',
    link: '/projects',
  },
  {
    name: 'Alpha',
    link: '/projects/alpha',
  },
  {
    name: 'Datasets',
    link: '/projects/alpha/datasets',
  },
  {
    name: 'Dataset 42',
    link: '/projects/alpha/datasets/42',
  },
  {
    name: 'Settings',
    link: '/projects/alpha/datasets/42/settings',
  },
  {
    name: 'Profile',
    link: '/projects/alpha/datasets/42/settings/profile',
  },
];

const defaultArgs: IBreadcrumbsProps = {
  organizations: [
    { id: 'org-1', name: 'Acme, Inc' },
    { id: 'org-2', name: 'Monsters Inc' },
    { id: 'org-3', name: 'Stark Industries' },
  ],
  workspaces: [
    { id: 'ws-1', name: 'Security Ops' },
    { id: 'ws-2', name: 'Threat Intel' },
    { id: 'ws-3', name: 'Platform Team' },
  ],
  pages: defaultPages,
};

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Molecule/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  args: { ...defaultArgs },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<IBreadcrumbsProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoPages: Story = {
  args: {
    ...defaultArgs,
    pages: [],
  },
};

export const SinglePage: Story = {
  args: {
    ...defaultArgs,
    pages: [defaultPages[0]],
  },
};

export const TwoPages: Story = {
  args: {
    ...defaultArgs,
    pages: [defaultPages[0], defaultPages[1]],
  },
};

export const ThreePages: Story = {
  args: {
    ...defaultArgs,
    pages: [defaultPages[0], defaultPages[1], defaultPages[2]],
  },
};

export const FourOrMorePages: Story = {};

export const SingleOrganizationLabel: Story = {
  args: {
    ...defaultArgs,
    organizations: [{ id: 'org-1', name: 'Acme, Inc' }],
  },
};

export const SingleWorkspaceLabel: Story = {
  args: {
    ...defaultArgs,
    workspaces: [{ id: 'ws-1', name: 'Security Ops' }],
  },
};

export const NoWorkspaces: Story = {
  args: {
    ...defaultArgs,
    workspaces: [],
  },
};

export const OmittedWorkspaces: Story = {
  args: {
    ...defaultArgs,
    workspaces: undefined,
  },
};

export const DisabledSelectors: Story = {
  args: {
    ...defaultArgs,
    disableOrganizationsDropdown: true,
    disableWorkspacesDropdown: true,
  },
};

export const MultiWorkspaceSelection: Story = {
  args: {
    ...defaultArgs,
    selectedWorkspaceIds: ['ws-1', 'ws-3'],
  },
};

export const AllWorkspacesSelected: Story = {
  args: {
    ...defaultArgs,
    selectedWorkspaceIds: [ALL_WORKSPACES_ID],
  },
};
