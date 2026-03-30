import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@radix-ui/themes';
import { IssuesSessionDetails, type IIssuesSessionDetailsProps } from '../..';
import { issuesSessionDetailsMockProps } from './IssuesSessionDetails.mocks';

const meta = {
  title: 'Compound/IssuesSessionDetails',
  component: IssuesSessionDetails,
  tags: ['autodocs'],
  render: (args) => <IssuesSessionDetails {...args} />,
} satisfies Meta<IIssuesSessionDetailsProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...issuesSessionDetailsMockProps,
    actions: (
      <>
        <Button variant="surface">Create Ticket</Button>
        <Button variant="surface">Copy Link</Button>
      </>
    ),
  },
};

export const TranscriptFirst: Story = {
  args: {
    ...issuesSessionDetailsMockProps,
    defaultTab: 'transcript',
  },
};
