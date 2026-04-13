import type { ButtonProps } from '@radix-ui/themes';
import type { ReactNode } from 'react';

/** Props for the {@link PrimaryButton} atom component. */
export type IPrimaryButtonProps = Omit<
  ButtonProps,
  'asChild' | 'color' | 'highContrast' | 'radius' | 'size' | 'variant'
> & {
  readonly icon?: ReactNode;
};
