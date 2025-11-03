import type { Meta, StoryObj } from '@storybook/react';

import { TextBarGraph, type ITextBarGraphProps } from '..';
import { AcornIcon, HeadphonesIcon, SealWarningIcon } from '@phosphor-icons/react';

const meta = {
  title: 'Atom/TextBarGraph',
  component: TextBarGraph,
  parameters: {
    layout: 'centered',
  },
  args: {
    percentage: 75,
    label: 'Percentile Bar Graph',
    icon: <AcornIcon />,
  },
  tags: ['autodocs'],
  render: (args) => (
    <div style={{ width: '50vw' }}>
      <TextBarGraph {...args} />
    </div>
  ),
} satisfies Meta<ITextBarGraphProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Overview: Story = {
  argTypes: {
    variant: {
      table: {
        disable: true,
      },
    },
    icon: {
      table: {
        disable: true,
      },
    },
    percentage: {
      table: {
        disable: true,
      },
    },
    label: {
      table: {
        disable: true,
      },
    },
  },
  render: (args) => (
    <div style={{ width: '50vw', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <TextBarGraph
        {...args}
        percentage={100}
        label="Total Organization Calls"
        icon={<HeadphonesIcon />}
        variant="default"
      />
      <TextBarGraph
        {...args}
        percentage={70}
        label="Total Protected Calls"
        icon={<HeadphonesIcon />}
        variant="info"
      />
      <TextBarGraph
        {...args}
        percentage={30}
        label="Unknown Calls"
        icon={<HeadphonesIcon />}
        variant="warning"
      />
      <TextBarGraph
        {...args}
        percentage={10}
        label="Suspicious Calls"
        icon={<SealWarningIcon />}
        variant="danger"
      />
    </div>
  ),
};
