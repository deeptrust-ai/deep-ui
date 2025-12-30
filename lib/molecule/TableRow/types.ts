import type { Icon as PhosIconTypes } from '@phosphor-icons/react';

export interface IITableRowAction {
  readonly label: string;
  readonly onClick: () => void;
  readonly icon?: PhosIconTypes;
}

export interface ITableRowCell {
  readonly id: string;
  readonly content: React.ReactNode;
}

export interface ITableRowProps {
  readonly id: string;
  readonly cells: ITableRowCell[];
  readonly actions?: IITableRowAction[];
  readonly active?: boolean;
}
