import type { ReactNode } from 'react';
import type { IContentWrapperProps } from '../atom';
import type { ITopbarProps } from '@deeptrust-ai/deep-ui/compound';

export type ILayoutComponent = IContentWrapperProps &
  Pick<
    ITopbarProps,
    | 'organizations'
    | 'workspaces'
    | 'pages'
    | 'selectedOrganizationId'
    | 'selectedWorkspaceIds'
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
