import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge, Box, Button, Card, Flex, Text } from '@radix-ui/themes';
import { CallDetails, type ICallDetailsProps } from '../..';

const meta = {
  title: 'Compound/CallDetails',
  component: CallDetails,
  tags: ['autodocs'],
  render: (args) => <CallDetails {...args} />,
} satisfies Meta<ICallDetailsProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Quarterly Vendor Review',
    subtitle: 'Dashboard call details shell for composing session-specific panels.',
    statusBadgeLabel: 'Verified Call',
    statusBadgeColor: 'green',
    summary:
      'Use this shell for dashboard-focused call detail experiences where the visible panels diverge from the Issues surface.',
    metaItems: [
      { label: 'Participants', value: '3 verified' },
      { label: 'Duration', value: '18m 42s' },
      { label: 'Queue', value: 'Finance ops' },
      { label: 'Last Updated', value: 'Mar 30, 2026 • 9:14 AM' },
    ],
    actions: (
      <>
        <Button variant="surface">Create Ticket</Button>
        <Button variant="surface">Share</Button>
      </>
    ),
    primaryContent: (
      <Flex direction="column" gap="3">
        <Card size="3" variant="surface">
          <Flex direction="column" gap="2">
            <Text size="4" weight="medium">
              Primary content slot
            </Text>
            <Text color="gray" size="3">
              Dashboard call details can place transcript, alerts, or AI findings here without
              inheriting the Issues tab set.
            </Text>
          </Flex>
        </Card>
        <Card size="3" variant="surface">
          <Box>
            <Text size="2" color="gray">
              Secondary primary-panel module
            </Text>
          </Box>
        </Card>
      </Flex>
    ),
    secondaryContent: (
      <Flex direction="column" gap="3">
        <Card size="3" variant="surface">
          <Flex direction="column" gap="2">
            <Text size="4" weight="medium">
              Aside slot
            </Text>
            <Flex wrap="wrap" gap="2">
              <Badge color="amber" radius="full" variant="soft">
                Risk review
              </Badge>
              <Badge color="blue" radius="full" variant="soft">
                Voice verified
              </Badge>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    ),
  },
};
