import type { ReactNode } from 'react';
import type { IMenuProps } from '../molecule/Menu/Menu.types';
import type { IContentWrapperProps } from '../atom';
import type { BreadcrumbEntity } from '../molecule/Breadcrumbs/Breadcrumbs.types';

export type ILayoutComponent = IContentWrapperProps & {
  readonly sidebar: ReactNode;
  readonly children: ReactNode;
  readonly menuPages?: IMenuProps['pages'];
  readonly userName: string;
  readonly organizations: BreadcrumbEntity[];
  readonly workspaces?: BreadcrumbEntity[];
};
