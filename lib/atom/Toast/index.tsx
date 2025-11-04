import { Toast } from 'radix-ui';
import { CaretDoubleRightIcon, WarningIcon } from '@phosphor-icons/react';
import { Button, Text } from 'frosted-ui';
import type { IToastProps } from './types';
import styles from './styles.module.css';

export default ({ message, title, duration, variant }: IToastProps) => {
  if (!message) {
    // If there's no message, don't render anything
    return null;
  }

  return (
    <Toast.Provider>
      <Toast.Root duration={duration} className={styles.toast}>
        <span className={styles.icon}>
          <WarningIcon weight="bold" />
        </span>
        {title && <Toast.Title>title</Toast.Title>}
        <Toast.Description asChild>
          <Text size="2" weight="bold" className={styles.message}>
            {message}
          </Text>
        </Toast.Description>
        {/* <Toast.Action altText="">/Toast.Action> // COMING SOON */}
        <Toast.Close aria-label="Close" asChild>
          <button className={styles.closeBtn}>
            <CaretDoubleRightIcon weight="bold" />
          </button>
        </Toast.Close>
      </Toast.Root>

      <Toast.Viewport />
    </Toast.Provider>
  );
};
