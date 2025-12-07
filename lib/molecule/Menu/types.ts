import type { ElementType } from 'react';
import type { IMenuItemProps } from '../../atom/MenuItem/types';

interface IExtendedMenuItemProps<TAnchor extends ElementType = 'a'>
  extends IMenuItemProps<TAnchor> {
  readonly subPages?: Omit<IMenuItemProps<TAnchor>, 'icon'>[];
}

export interface IMenuProps<TAnchor extends ElementType = 'a'> {
  readonly pages: IExtendedMenuItemProps<TAnchor>[];
  readonly anchorComponent?: TAnchor;
}
