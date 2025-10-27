import type { IMenuItemProps } from '../../atom/MenuItem/types';

interface IExtendedMenuItemProps extends IMenuItemProps {
  readonly subPages?: IMenuItemProps[];
}

export interface IMenuProps {
  readonly pages: IExtendedMenuItemProps[];
}
