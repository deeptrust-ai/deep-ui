import type { Meta, StoryObj } from '@storybook/react';

import { ReviewAlerts, type IReviewAlertsProps } from '../..';

const defaultArgs: IReviewAlertsProps = {};

const meta = {
  title: 'Molecule/ReviewAlerts',
  component: ReviewAlerts,
  args: { ...defaultArgs },
  tags: ['autodocs'],
} satisfies Meta<IReviewAlertsProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
