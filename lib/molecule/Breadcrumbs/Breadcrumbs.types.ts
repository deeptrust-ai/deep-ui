import type { ReactNode } from 'react';

export type BreadcrumbEntity = {
  id: string;
  name: string;
};

export type BreadcrumbPage = {
  name: ReactNode;
  link: string;
};

export interface IBreadcrumbsProps {
  organizations: BreadcrumbEntity[];
  workspaces?: BreadcrumbEntity[];
  pages?: BreadcrumbPage[];
  disableOrganizationsDropdown?: boolean;
  disableWorkspacesDropdown?: boolean;
  selectedOrganizationId?: string;
  /** @deprecated Use selectedWorkspaceIds instead. */
  selectedWorkspaceId?: string;
  selectedWorkspaceIds?: string[];
  defaultSelectedWorkspaceIds?: string[];
  onOrganizationSelect?: (organizationId: string) => void;
  /** @deprecated Use onWorkspaceSelectionChange instead. */
  onWorkspaceSelect?: (workspaceId: string) => void;
  onWorkspaceSelectionChange?: (workspaceIds: string[]) => void;
}
