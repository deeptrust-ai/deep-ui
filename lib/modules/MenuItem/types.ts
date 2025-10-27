import { type ButtonProps as FrostButtonProps } from 'frosted-ui';
import { ReactNode } from 'react';

export const buttonColors = [
  'gray',
  'danger',
  'warning',
  'success',
  'info',
  'violet',
  'green',
  'blue',
  'orange',
  'red',
  'yellow',
] as const;

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
