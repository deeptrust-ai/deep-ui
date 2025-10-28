import type { ButtonHTMLAttributes } from 'react';

export interface IOrganizationDropdown {
  readonly name: string;
  readonly isTrial?: boolean;
  readonly selected?: boolean;
}

export interface IOrganizationDropdownProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly organizations: IOrganizationDropdown[];
}
