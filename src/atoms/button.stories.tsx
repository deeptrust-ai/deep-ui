import type { Meta, StoryObj } from '@storybook/react';

import { DownloadIcon, AcornIcon } from '@phosphor-icons/react';
import type { ComponentType } from 'react';

import {
  Button,
  type ButtonProps,
  Code,
  Spinner as FrostedSpinner,
  Text,
  type SpinnerProps,
  buttonPropDefs,
} from '@deeptrust/deep-ui';

// this will be gone soon
const SpinnerComponent = FrostedSpinner as unknown as ComponentType<SpinnerProps>;
const Spinner = (props: SpinnerProps) => <SpinnerComponent {...props} />;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Atoms/Button',
  component: Button,
  args: {
    disabled: false,
    highContrast: false,
  },
  argTypes: {
    size: {
      options: buttonPropDefs.size.values,
      control: { type: 'inline-radio' },
      table: { defaultValue: { summary: buttonPropDefs.size.default } },
    },
    variant: {
      options: buttonPropDefs.variant.values,
      control: { type: 'select' },
      table: { defaultValue: { summary: buttonPropDefs.variant.default } },
    },
    color: {
      options: buttonPropDefs.color.values,
      control: { type: 'select' },
      table: { defaultValue: { summary: buttonPropDefs.color.default } },
    },
  },
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<ButtonProps>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    children: 'Button',
    size: buttonPropDefs.size.default,
    variant: buttonPropDefs.variant.default,
    color: buttonPropDefs.color.default,
  },
};

export const Size: Story = {
  args: {
    children: 'Button',
    size: buttonPropDefs.size.default,
    variant: buttonPropDefs.variant.default,
    color: buttonPropDefs.color.default,
  },
  render: (args: ButtonProps) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
      <Button {...args} size="4" />
      <Button {...args} size="3" />
      <Button {...args} size="2" />
      <Button {...args} size="1" />
    </div>
  ),
};

export const Variant: Story = {
  args: {
    children: 'Button',
    size: buttonPropDefs.size.default,
    color: buttonPropDefs.color.default,
  },
  render: (args: ButtonProps) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
      <Button {...args} variant="classic" />
      <Button {...args} variant="solid" />
      <Button {...args} variant="soft" />
      <Button {...args} variant="surface" />
      <Button {...args} variant="ghost" />
    </div>
  ),
};

export const Color: Story = {
  args: {
    children: 'Button',
    size: buttonPropDefs.size.default,
  },
  render: (args: ButtonProps) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
      <Button {...args} color="indigo" />
      <Button {...args} color="cyan" />
      <Button {...args} color="orange" />
      <Button {...args} color="crimson" />
    </div>
  ),
};

export const SemanticColor: Story = {
  name: 'Semantic color',
  args: {
    size: buttonPropDefs.size.default,
  },
  render: (args: ButtonProps) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
      <Button {...args} color="info">
        Info
      </Button>
      <Button {...args} color="success">
        Success
      </Button>
      <Button {...args} color="warning">
        Warning
      </Button>
      <Button {...args} color="danger">
        Danger
      </Button>
    </div>
  ),
};

export const HighContrast: Story = {
  name: 'High Contrast',
  args: {
    children: 'Button',
  },
  render: (args: ButtonProps) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
      <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
        <Button {...args} highContrast={false} variant="classic" />
        <Button {...args} highContrast={false} variant="solid" />
        <Button {...args} highContrast={false} variant="soft" />
        <Button {...args} highContrast={false} variant="surface" />
        <Button {...args} highContrast={false} variant="ghost" />
      </div>
      <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
        <Button {...args} variant="classic" highContrast />
        <Button {...args} variant="solid" highContrast />
        <Button {...args} variant="soft" highContrast />
        <Button {...args} variant="surface" highContrast />
        <Button {...args} variant="ghost" highContrast />
      </div>
    </div>
  ),
};

export const WithIcons: Story = {
  name: 'With Icons',
  args: {
    size: buttonPropDefs.size.default,
  },
  render: (args: ButtonProps) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
      <Button {...args}>
        <AcornIcon /> With icon
      </Button>
    </div>
  ),
};

export const Loading: Story = {
  args: {
    children: 'Button',
    size: buttonPropDefs.size.default,
    color: buttonPropDefs.color.default,
    disabled: undefined,
    loading: true,
  },
  render: (args: ButtonProps) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', maxWidth: 650 }}>
      <Text>
        Buttons have their own <Code>loading</Code> prop that automatically composes a spinner.
      </Text>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
        <Button {...args} variant="classic" />
        <Button {...args} variant="solid" />
        <Button {...args} variant="soft" />
        <Button {...args} variant="surface" />
        <Button {...args} variant="ghost" />
      </div>
      <Text>
        If you have an icon inside the button, you can use the button`s <Code>disabled</Code> state
        and wrap the icon in a standalone <Code>{`<Spinner>`}</Code> to achieve a more sophisticated
        design.
      </Text>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
        <Button {...args} loading={false} variant="classic">
          <Spinner loading={false}>
            <DownloadIcon />
          </Spinner>
          Download
        </Button>
        <Button {...args} loading={false} variant="classic" disabled>
          <Spinner loading>
            <DownloadIcon />
          </Spinner>
          Download
        </Button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
        <Button {...args} loading={false} variant="soft">
          <Spinner loading={false}>
            <DownloadIcon />
          </Spinner>
          Download
        </Button>
        <Button {...args} loading={false} variant="soft" disabled>
          <Spinner loading>
            <DownloadIcon />
          </Spinner>
          Download
        </Button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
        <Button {...args} loading={false} variant="solid">
          <Spinner loading={false}>
            <DownloadIcon />
          </Spinner>
          Download
        </Button>
        <Button {...args} loading={false} variant="solid" disabled>
          <Spinner loading>
            <DownloadIcon />
          </Spinner>
          Download
        </Button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
        <Button {...args} loading={false} variant="surface">
          <Spinner loading={false}>
            <DownloadIcon />
          </Spinner>
          Download
        </Button>
        <Button {...args} loading={false} variant="surface" disabled>
          <Spinner loading>
            <DownloadIcon />
          </Spinner>
          Download
        </Button>
      </div>
    </div>
  ),
};
