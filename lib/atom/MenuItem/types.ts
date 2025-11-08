import type { Icon as PhosIconTypes } from '@phosphor-icons/react';

import type { ButtonProps as FrostButtonProps } from 'frosted-ui';
import type { buttonColors } from './constants';

export type ButtonProps = Omit<FrostButtonProps, 'color'> & {
  color?: (typeof buttonColors)[number];
};
export interface IMenuItemProps {
  /** Icon component for the menu item */
  readonly icon?: PhosIconTypes;
  /** Label for the menu item */
  readonly label: string;
  /** Link URL for the menu item */
  readonly link: string;
  /** Whether the menu item is selected */
  readonly selected?: boolean;
  /** Whether the menu item is a subpage */
  readonly subpage?: boolean;
}
