import { WarningIcon, CheckCircleIcon, WarningDiamondIcon, InfoIcon } from '@phosphor-icons/react';
import { Callout, Text } from '@radix-ui/themes';
import type { IToastProps } from './types';
import styles from './styles.module.css';
// import { PERSIST_DURATION, DEFAULT_DURATION } from './constants';

export const Toast = ({
  message,
  // title,
  // duration: durationProp,
  variant = 'info',
}: IToastProps) => {
  if (!message) {
    // If there's no message, don't render anything
    return null;
  }

  // const durationMs = durationProp === 0 ? PERSIST_DURATION : durationProp; // 1 hour for "stay until dismissed"
  // const duration = durationMs ?? DEFAULT_DURATION; // Default to 5 seconds otherwise

  // const variantClass = variant ? styles[variant] : '';

  return (
    <>
      <Callout.Root size="2">
        <Callout.Icon>
          <span className={styles.icon}>
            {variant === 'success' && <CheckCircleIcon weight="bold" />}
            {variant === 'error' && <WarningIcon weight="bold" />}
            {variant === 'info' && <InfoIcon weight="bold" />}
            {variant === 'warning' && <WarningDiamondIcon weight="bold" />}
          </span>
        </Callout.Icon>
        <Text size="2" weight="bold" className={styles.message} asChild>
          <Callout.Text>{message}</Callout.Text>
        </Text>
      </Callout.Root>
    </>
  );
};

export default Toast;
export { type IToastProps };
