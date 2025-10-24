import { type ButtonProps as FrostButtonProps } from 'frosted-ui';

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
