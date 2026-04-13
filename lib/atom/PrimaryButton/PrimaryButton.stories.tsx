import type { Meta, StoryObj } from '@storybook/react-vite';
import { PlusIcon } from '@phosphor-icons/react';
import { Flex } from '@radix-ui/themes';
import { PrimaryButton, type IPrimaryButtonProps } from '../..';

const meta = {
  title: 'Atom/PrimaryButton',
  component: PrimaryButton,
  args: {
    children: 'New Role',
    icon: <PlusIcon weight="bold" />,
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<IPrimaryButtonProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const States: Story = {
  render: () => (
    <Flex gap="4" align="center" wrap="wrap">
      <PrimaryButton icon={<PlusIcon weight="bold" />}>New Role</PrimaryButton>
      <PrimaryButton disabled>Disabled</PrimaryButton>
    </Flex>
  ),
};
