import type { ButtonHTMLAttributes } from 'react';

/** A single organization entry in the dropdown list. */
export interface IOrganizationDropdown {
  readonly name: string;
  readonly selected?: boolean;
}

/** Props for the {@link OrganizationDropdown} atom component. */
export interface IOrganizationDropdownProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly organizations: IOrganizationDropdown[];
}
