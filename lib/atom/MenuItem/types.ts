import type { ComponentPropsWithoutRef, ElementType } from 'react';
import type { Icon as PhosIconTypes } from '@phosphor-icons/react';

export type MenuItemAnchorProps<TAnchor extends ElementType> = Omit<
  ComponentPropsWithoutRef<TAnchor>,
  'children'
> & {
  /** Additional className is merged into MenuItem styles */
  readonly className?: string;
  /** Optional href that falls back to `link` when anchor renders an <a> */
  readonly href?: ComponentPropsWithoutRef<TAnchor> extends { href?: infer THref } ? THref : unknown;
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
  /**
   * Link URL for the menu item.
   * Used as the default `href` when rendering a native anchor.
   */
  readonly link?: string;
  /** Whether the menu item is selected */
  readonly selected?: boolean;
  /** Whether the menu item is a subpage */
  readonly subpage?: boolean;
}
