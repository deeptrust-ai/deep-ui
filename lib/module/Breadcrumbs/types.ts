export interface IBreadcrumbOrganizations {
  readonly name: string;
  readonly isTrial?: boolean;
  readonly selected?: boolean;
}

export interface IBreadcrumbsProps {
  organizations: IBreadcrumbOrganizations[];
}
