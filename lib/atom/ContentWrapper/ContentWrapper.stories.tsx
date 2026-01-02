import type { Meta, StoryObj } from '@storybook/react-vite';

import { ContentWrapper, type IContentWrapperProps } from '../..';
import pkg from '../../../package.json';
import { Box } from '@radix-ui/themes';
import { Text } from '@radix-ui/themes';

const meta = {
  title: 'Atom/ContentWrapper',
  component: ContentWrapper,
  args: {
    title: 'Welcome to DeepUI',
    subtitle: 'Build beautiful UIs with ease',
    metaInfo: `Version ${pkg.version}`,
  },
  tags: ['autodocs'],
  render: (args) => (
    <ContentWrapper {...args}>
      <Box>
        <Text as="p">
          DeepUI is a comprehensive design system that provides a wide range of components and
          utilities to help developers create stunning user interfaces quickly and efficiently.
        </Text>
        <Text as="p">
          With DeepUI, you can easily customize the look and feel of your application while
          maintaining consistency across all your UI elements.
        </Text>
      </Box>
    </ContentWrapper>
  ),
} satisfies Meta<IContentWrapperProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: null,
  },
};
