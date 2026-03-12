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
  selectedWorkspaceIds?: string[];
  onOrganizationSelect?: (organizationId: string) => void;
  onWorkspaceSelectionChange?: (workspaceIds: string[]) => void;
}
