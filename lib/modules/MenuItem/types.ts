import type { ButtonProps as FrostButtonProps } from 'frosted-ui';
import type { ReactNode } from 'react';
import type { buttonColors } from './constants';

export type ButtonProps = Omit<FrostButtonProps, 'color'> & {
  color?: (typeof buttonColors)[number];
};

export interface IMenuItemProps {
  readonly label: string;
  readonly icon?: ReactNode;
  readonly link?: string;
  readonly selected?: boolean;
  readonly subItem?: boolean;
}
