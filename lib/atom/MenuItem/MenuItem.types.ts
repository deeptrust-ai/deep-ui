import type { ComponentPropsWithoutRef, ElementType } from 'react';
import type { Icon as PhosIconTypes } from '@phosphor-icons/react';

export type MenuItemAnchorProps<TAnchor extends ElementType = 'a'> = Omit<
  ComponentPropsWithoutRef<TAnchor>,
  'children'
> & {
  /** Additional className is merged into MenuItem styles */
  readonly className?: string;
};

export interface IMenuItemProps<TAnchor extends ElementType = 'a'> {
  /** Custom component used to render the anchor */
  readonly anchorComponent?: TAnchor;
  /** Props passed to the anchor component; typed from `anchorComponent` */
  readonly anchorProps?: MenuItemAnchorProps<TAnchor>;
  /** Icon component for the menu item */
  readonly icon?: PhosIconTypes;
  /** Label for the menu item */
  readonly label: string;
  /** Whether the menu item is selected */
  readonly selected?: boolean;
  /** Whether the menu item is a subpage */
  readonly subpage?: boolean;
  /** If it's the heading of a set of subpages */
  readonly heading?: boolean;
  /** Class name used by routing tools to dynamically mark active routes */
  readonly activeClassName?: string;
}
