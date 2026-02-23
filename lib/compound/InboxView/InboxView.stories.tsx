import type { Meta, StoryObj } from '@storybook/react-vite';
import { InboxView, type IInboxViewProps } from '../..';
import TranscriptItem from './parts/TranscriptItem';
import { Box, Text } from '@radix-ui/themes';

const meta = {
  title: 'Compound/InboxView',
  component: InboxView,
  parameters: {
    layout: 'full',
  },
  tags: ['autodocs'],
  render: (args) => (
    <Box height="100vh">
      <InboxView {...args} />
    </Box>
  ),
  args: {
    tabs: [
      {
        label: 'Transcript',
        value: 'transcript',
        content: (
          <>
            <TranscriptItem />
            <TranscriptItem />
            <TranscriptItem />
            <TranscriptItem />
            <TranscriptItem />
            <TranscriptItem />
            <TranscriptItem />
            <TranscriptItem />
            <TranscriptItem />
            <TranscriptItem />
            <TranscriptItem />
            <TranscriptItem />
            <TranscriptItem />
            <TranscriptItem />
            <TranscriptItem />
            <TranscriptItem />
            <TranscriptItem />
            <TranscriptItem />
            <TranscriptItem />
            <TranscriptItem />
            <TranscriptItem />
            <TranscriptItem />
            <TranscriptItem />
          </>
        ),
      },
      {
        label: 'Details',
        value: 'details',
        content: (
          <Box>
            <Text size="2" color="gray">
              Meeting Details:
            </Text>
            <Text size="3">- Date: January 1, 2024</Text>
            <Text size="3">- Time: 12:00 PM</Text>
            <Text size="3">- Participants: Alice, Bob</Text>
          </Box>
        ),
      },
    ],
  },
} satisfies Meta<IInboxViewProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
