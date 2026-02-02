import type { Meta, StoryObj } from '@storybook/react-vite';
import { VerticalTabs } from '../..';

const TabsDemo = () => {
  return (
    <VerticalTabs.Root defaultValue="overview" style={{ maxWidth: 640 }}>
      <VerticalTabs.List>
        <VerticalTabs.Trigger value="overview">Overview</VerticalTabs.Trigger>
        <VerticalTabs.Trigger value="security">Security</VerticalTabs.Trigger>
        <VerticalTabs.Trigger value="billing">Billing</VerticalTabs.Trigger>
      </VerticalTabs.List>
      <VerticalTabs.Content value="overview">
        Keep your organization details and defaults up to date.
      </VerticalTabs.Content>
      <VerticalTabs.Content value="security">
        Configure authentication, access, and alerting settings.
      </VerticalTabs.Content>
      <VerticalTabs.Content value="billing">
        Review invoices and update subscription information.
      </VerticalTabs.Content>
    </VerticalTabs.Root>
  );
};

const meta = {
  title: 'Molecule/Tabs',
  component: TabsDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof TabsDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
