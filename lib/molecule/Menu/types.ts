import type { IMenuItemProps } from '../../atom/MenuItem/types';

interface IExtendedMenuItemProps extends IMenuItemProps {
  readonly subPages?: Omit<IMenuItemProps, 'icon'>[];
}

export interface IMenuProps {
  readonly pages: IExtendedMenuItemProps[];
}
