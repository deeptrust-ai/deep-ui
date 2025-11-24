import type { Meta, StoryObj } from '@storybook/react-vite';

import { OrganizationDropdown, type IOrganizationDropdownProps } from '../..';
import { Button } from 'frosted-ui';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Atom/OrganizationDropdown',
  component: OrganizationDropdown,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  render: (args) => (
    <Button asChild>
      <OrganizationDropdown {...args} />
    </Button>
  ),
} satisfies Meta<IOrganizationDropdownProps>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  organizations: [
    { name: 'Acme, Inc', isTrial: true, selected: true },
    { name: 'Monsters Inc', isTrial: true },
    { name: 'Stark Industries', isTrial: false },
  ],
};

export const Default: Story = {
  args: {
    ...defaultArgs,
  },
};
