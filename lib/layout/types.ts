import type { ReactNode } from 'react';
import type { ITopbarProps } from '../compound';

/** Props for the {@link Layout} component, combining topbar configuration with page content slots. */
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
  | 'logoAnchorComponent'
  | 'logoAnchorProps'
  | 'userName'
  | 'userPfp'
  | 'userMenuItems'
  | 'logout'
> & {
  readonly topContent?: ReactNode;
  readonly sidebar?: ReactNode;
  readonly children: ReactNode;
};
