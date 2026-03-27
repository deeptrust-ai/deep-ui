import type { ReactNode } from 'react';

/** A selectable entity (organisation or workspace) in the breadcrumb trail. */
export type BreadcrumbEntity = {
  id: string;
  name: string;
};

/** A page link displayed in the breadcrumb trail. */
export type BreadcrumbPage = {
  name: ReactNode;
  link: string;
};

/** Props for the {@link Breadcrumbs} molecule component. */
export interface IBreadcrumbsProps {
  organizations: BreadcrumbEntity[];
  workspaces?: BreadcrumbEntity[];
  pages?: BreadcrumbPage[];
  disableOrganizationsDropdown?: boolean;
  disableWorkspacesDropdown?: boolean;
  selectedOrganizationId?: string;
  selectedWorkspaceIds?: string[];
  defaultSelectedWorkspaceIds?: string[];
  onOrganizationSelect?: (organizationId: string) => void;
  onWorkspaceSelectionChange?: (workspaceIds: string[]) => void;
}
