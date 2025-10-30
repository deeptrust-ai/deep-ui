import type { ButtonHTMLAttributes } from 'react';

export interface IOrganizationDropdown {
  readonly name: string;
  readonly selected?: boolean;
}

export interface IOrganizationDropdownProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly organizations: IOrganizationDropdown[];
}
