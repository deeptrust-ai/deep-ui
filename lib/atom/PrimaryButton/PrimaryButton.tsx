import cn from 'classnames';
import { Button } from '@radix-ui/themes';
import type { IPrimaryButtonProps } from './PrimaryButton.types';
import styles from './PrimaryButton.module.css';

/** Primary call-to-action button styled to match the DeepTrust design system. */
const PrimaryButton = ({ className, children, icon, ...rest }: IPrimaryButtonProps) => {
  return (
    <Button
      {...rest}
      color="blue"
      radius="large"
      size="2"
      variant="solid"
      className={cn(styles.button, className)}
    >
      {icon ? (
        <span aria-hidden="true" className={styles.icon}>
          {icon}
        </span>
      ) : null}
      <span className={styles.label}>{children}</span>
    </Button>
  );
};

export default PrimaryButton;
export type { IPrimaryButtonProps } from './PrimaryButton.types';
