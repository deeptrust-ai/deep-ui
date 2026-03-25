import type { ReactNode } from 'react';
import type { IContentWrapperProps } from '../atom';
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
  /**
   * @deprecated Use `ContentWrapper` directly around `children`.
   */
  readonly title?: IContentWrapperProps['title'];
  /**
   * @deprecated Use `ContentWrapper` directly around `children`.
   */
  readonly subtitle?: IContentWrapperProps['subtitle'];
  /**
   * @deprecated Use `ContentWrapper` directly around `children`.
   */
  readonly metaInfo?: IContentWrapperProps['metaInfo'];
  /**
   * @deprecated Use `ContentWrapper` directly around `children`.
   */
  readonly wrapContent?: boolean;
  /**
   * @deprecated The split view is controlled by rendering `sidebar`.
   * Accepted for backward compatibility with older consumers.
   */
  readonly sidebarExpanded?: boolean;
  readonly sidebar?: ReactNode;
  readonly children: ReactNode;
};
