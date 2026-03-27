import type { Icon } from '@phosphor-icons/react';
import React from 'react';

/** An action button rendered in a table row's actions column. */
export interface ITableRowAction {
  readonly label: string;
  readonly onClick: () => void;
  readonly icon?: Icon;
}

/** A single cell within a table row. */
export interface ITableRowCell {
  readonly id: string;
  readonly content: React.ReactNode;
}

/** Props for the {@link TableRow} molecule component. */
export interface ITableRowProps {
  readonly id: string;
  readonly cells: ITableRowCell[];
  readonly actions?: ITableRowAction[];
  readonly name?: string;
  readonly onClickRow?: () => void;
  readonly selected?: boolean;
}
