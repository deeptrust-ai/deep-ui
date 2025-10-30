import type { IOrganizationDropdown } from '../../atom/OrganizationDropdown/types';

type Crumb = {
  label: string;
  href: string;
};
export interface IBreadcrumbsProps {
  organizations: IOrganizationDropdown[];
  crumbs?: Crumb[];
  overflowThreshold?: number;
}
