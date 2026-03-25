import type { Icon } from '@phosphor-icons/react';
import React from 'react';

export interface ITableRowAction {
  readonly label: string;
  readonly onClick: () => void;
  readonly icon?: Icon;
}

export interface ITableRowCell {
  readonly id: string;
  readonly content: React.ReactNode;
}

export interface ITableRowProps {
  readonly id: string;
  readonly cells: ITableRowCell[];
  readonly name?: string;
  readonly onClickRow?: () => void;
  readonly selected?: boolean;
  /**
   * @deprecated Use `selected` instead.
   */
  readonly active?: boolean;
  /**
   * @deprecated Prefer explicit action cells when authoring new tables.
   */
  readonly actions?: ITableRowAction[];
}
