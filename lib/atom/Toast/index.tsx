import { Toast as RadixToast } from 'radix-ui';
import cn from 'classnames';
import {
  CaretDoubleRightIcon,
  WarningIcon,
  CheckCircleIcon,
  WarningDiamondIcon,
  InfoIcon,
} from '@phosphor-icons/react';
import { Text } from 'frosted-ui';
import type { IToastProps } from './types';
import styles from './styles.module.css';

const Toast = ({ message, title, duration: durationProp, variant }: IToastProps) => {
  if (!message) {
    // If there's no message, don't render anything
    return null;
  }

  const durationMs = durationProp === 0 ? 3.6e6 : durationProp; // 1 hour for "stay until dismissed"
  const duration = durationMs ?? 5000; // Default to 5 seconds overwise

  const variantClass = variant ? styles[variant] : '';

  return (
    <RadixToast.Provider>
      <RadixToast.Root duration={duration} className={cn(styles.toast, variantClass)}>
        <span className={styles.icon}>
          {variant === 'success' && <CheckCircleIcon weight="bold" />}
          {variant === 'error' && <WarningIcon weight="bold" />}
          {variant === 'info' && <InfoIcon weight="bold" />}
          {variant === 'warning' && <WarningDiamondIcon weight="bold" />}
        </span>
        {title && <RadixToast.Title>title</RadixToast.Title>}
        <RadixToast.Description asChild>
          <Text size="2" weight="bold" className={styles.message}>
            {message}
          </Text>
        </RadixToast.Description>
        {/* <RadixToast.Action altText="">/RadixToast.Action> // COMING SOON */}
        <RadixToast.Close aria-label="Close" asChild>
          <button className={styles.closeBtn}>
            <CaretDoubleRightIcon weight="bold" />
          </button>
        </RadixToast.Close>
      </RadixToast.Root>

      <RadixToast.Viewport />
    </RadixToast.Provider>
  );
};

export default Toast;
export { type IToastProps };
