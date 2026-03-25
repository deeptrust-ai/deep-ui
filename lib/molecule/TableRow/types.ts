import React from 'react';

export interface ITableRowCell {
  readonly id: string;
  readonly content: React.ReactNode;
}

export interface ITableRowProps {
  readonly id: string;
  readonly cells: ITableRowCell[];
  readonly name: string;
  readonly onClickRow?: () => void;
  readonly selected?: boolean;
}
