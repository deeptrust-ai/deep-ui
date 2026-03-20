import type { Icon as PhosIconTypes } from '@phosphor-icons/react';
import type { ComponentPropsWithoutRef, ElementType } from 'react';

export type MenuItemAnchorProps<TAnchor extends ElementType = 'a'> = Omit<
  ComponentPropsWithoutRef<TAnchor>,
  'children'
> & {
  readonly className?: string;
};

export interface IMenuItemProps<TAnchor extends ElementType = 'a'> {
  readonly anchorComponent?: TAnchor;
  readonly anchorProps?: MenuItemAnchorProps<TAnchor>;
  readonly icon?: PhosIconTypes;
  readonly label: string;
  readonly selected?: boolean;
  readonly subpage?: boolean;
  readonly heading?: boolean;
  readonly activeClassName?: string;
}
