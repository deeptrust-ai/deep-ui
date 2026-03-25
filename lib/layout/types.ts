import type { ReactNode } from 'react';
import type { IContentWrapperProps } from '../atom';
import type { ITopbarProps } from '../compound';

export type ILayoutComponent = IContentWrapperProps &
  Pick<
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
    readonly sidebar?: ReactNode;
    readonly children: ReactNode;
    readonly wrapContent?: boolean;
    readonly sidebarExpanded?: boolean;
  };
