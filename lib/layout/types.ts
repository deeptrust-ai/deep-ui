import type { ReactNode } from 'react';
import type { ISidebarMenu } from '../compound/Sidebar/types';
import type { IOrganizationDropdown } from '../atom/OrganizationDropdown/types';

export interface ILayoutComponent {
  readonly sidebar: ReactNode;
  readonly children?: ReactNode;
  readonly menuPages?: ISidebarMenu['menuPages'];
  readonly userName: string;
  readonly organizations: IOrganizationDropdown[];
}
