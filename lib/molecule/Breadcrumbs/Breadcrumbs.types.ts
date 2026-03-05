export type BreadcrumbEntity = {
  id: string;
  name: string;
};

export type BreadcrumbPage = {
  name: string;
  link: string;
};

export interface IBreadcrumbsProps {
  organizations: BreadcrumbEntity[];
  workspaces: BreadcrumbEntity[];
  pages?: BreadcrumbPage[];
}
