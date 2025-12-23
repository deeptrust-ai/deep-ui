import {
  WarningIcon,
  CheckCircleIcon,
  WarningDiamondIcon,
  InfoIcon,
  CaretDoubleRightIcon,
} from '@phosphor-icons/react';
import { Callout as RadixCallout, Flex, Text, IconButton } from '@radix-ui/themes';
import type { CalloutVariant, ICalloutProps } from './Callout.types';
import styles from './Callout.module.css';
import cn from 'classnames';
import type { ComponentProps } from 'react';

type CalloutColor = ComponentProps<typeof RadixCallout.Root>['color'];

const calloutVariantColor: Record<CalloutVariant, CalloutColor> = {
  success: 'green',
  error: 'red',
  info: 'blue',
  warning: 'yellow',
};

export const Callout = ({ message, variant = 'info', onClick }: ICalloutProps) => {
  if (!message) {
    // If there's no message, don't render anything
    return null;
  }

  const iconClassNames = cn(styles.icon, styles[variant]);
  const actionButtonClassNames = cn(styles.actionButton, styles[variant]);

  return (
    <RadixCallout.Root
      size="2"
      color={calloutVariantColor[variant]}
      variant="surface"
      className={styles.container}
    >
      <Flex direction="row" align="center" gap="3">
        <RadixCallout.Icon className={iconClassNames}>
          {variant === 'success' && <CheckCircleIcon weight="bold" size="14px" />}
          {variant === 'error' && <WarningIcon weight="bold" size="14px" />}
          {variant === 'info' && <InfoIcon weight="bold" size="14px" />}
          {variant === 'warning' && <WarningDiamondIcon weight="bold" size="14px" />}
        </RadixCallout.Icon>
        <Text size="2" weight="bold" className={styles.message} asChild>
          <RadixCallout.Text>{message}</RadixCallout.Text>
        </Text>
      </Flex>

      {onClick && (
        <IconButton
          variant="surface"
          onClick={onClick}
          className={actionButtonClassNames}
          color={calloutVariantColor[variant]}
        >
          <CaretDoubleRightIcon weight="bold" size="14px" />
        </IconButton>
      )}
    </RadixCallout.Root>
  );
};

export default Callout;
export { type ICalloutProps };
