import { Button } from '@radix-ui/themes';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

/** A single entity entry in the dropdown list. */
export interface IEntityDropdownItem {
  readonly name: string;
  readonly selected?: boolean;
}

/** Props for the {@link EntityDropdown} atom component. */
export interface IEntityDropdownProps extends ComponentPropsWithoutRef<typeof Button> {
  readonly entities?: IEntityDropdownItem[];
  readonly label?: string;
  readonly icon?: ReactNode;
  readonly organizations?: IEntityDropdownItem[];
}
