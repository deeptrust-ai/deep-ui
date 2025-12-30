import type { ReactNode } from 'react';
import type { IMenuProps } from '../molecule/Menu/Menu.types';
import type { IOrganizationDropdown } from '../atom/OrganizationDropdown/types';
import type { IContentWrapperProps } from '../atom';

export type ILayoutComponent = IContentWrapperProps & {
  readonly sidebar: ReactNode;
  readonly children: ReactNode;
  readonly menuPages?: IMenuProps['pages'];
  readonly userName: string;
  readonly organizations: IOrganizationDropdown[];
};
