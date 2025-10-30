import type { Meta, StoryObj } from '@storybook/react';

import { Breadcrumbs, type IBreadcrumbsProps } from '../..';

const defaultCrumbs: NonNullable<IBreadcrumbsProps['crumbs']> = [
  {
    label: 'Projects',
    href: '/projects',
  },
  {
    label: 'Alpha',
    href: '/projects/alpha',
  },
  {
    label: 'Datasets',
    href: '/projects/alpha/datasets',
  },
  {
    label: 'Dataset 42',
    href: '/projects/alpha/datasets/42',
  },
  {
    label: 'Settings',
    href: '/projects/alpha/datasets/42/settings',
  },
  {
    label: 'Profile',
    href: '/projects/alpha/datasets/42/settings/profile',
  },
];

const defaultArgs: IBreadcrumbsProps = {
  organizations: [
    { name: 'Acme, Inc', selected: true },
    { name: 'Monsters Inc' },
    { name: 'Stark Industries' },
  ],
  crumbs: defaultCrumbs,
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

export const OverflowCrumbs: Story = {};

export const SingleCrumb: Story = {
  args: {
    ...defaultArgs,
    crumbs: [defaultCrumbs[0]],
  },
};

export const TwoCrumbs: Story = {
  args: {
    ...defaultArgs,
    crumbs: [defaultCrumbs[0], defaultCrumbs[1]],
  },
};

export const NoCrumbs: Story = {
  args: {
    ...defaultArgs,
    crumbs: [],
  },
};
