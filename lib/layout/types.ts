import type { ReactNode } from 'react';
import type { ITopbarProps } from '../compound';

export type ILayoutComponent = Pick<
  ITopbarProps,
  | 'organizations'
  | 'workspaces'
  | 'pages'
  | 'disableOrganizationsDropdown'
  | 'disableWorkspacesDropdown'
  | 'selectedOrganizationId'
  | 'selectedWorkspaceIds'
  | 'defaultSelectedWorkspaceIds'
  | 'onOrganizationSelect'
  | 'onWorkspaceSelectionChange'
  | 'links'
  | 'userName'
  | 'userPfp'
  | 'userMenuItems'
  | 'logout'
> & {
  readonly sidebarExpanded?: boolean;
  readonly sidebar?: ReactNode;
  readonly children: ReactNode;
};
