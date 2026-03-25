import React from 'react';

export interface ITableRowCell {
  readonly id: string;
  readonly content: React.ReactNode;
}

export interface ITableRowProps {
  readonly id: string;
  readonly cells: ITableRowCell[];
  readonly onClickRow?: () => void;
  readonly active?: boolean;
}
