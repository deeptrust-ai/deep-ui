import {  Table as RadixTable } from '@radix-ui/themes';
import type { KeyboardEvent } from 'react';

import type { ITableRowProps } from './types';
import styles from './styles.module.css';
import cn from 'classnames';

const TableRow = ({ name, id, cells, onClickRow, selected }: ITableRowProps) => {
  if (!cells || cells.length === 0) {
    return null;
  }

  const isClickable = Boolean(onClickRow);

  const handleKeyDown = (event: KeyboardEvent<HTMLTableRowElement>) => {
    if (!onClickRow) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClickRow();
    }
  };

  return (
    <RadixTable.Row
      data-row-id={id}
      className={cn({ [styles.row]: isClickable, [styles.selectedRow]: selected })}
      onClick={onClickRow}
      onKeyDown={isClickable ? handleKeyDown : undefined}
      tabIndex={isClickable ? 0 : undefined}
      aria-label={name ?? id}
      aria-selected={selected || undefined}
    >
      {cells.map((cell) => {
        return (
          <RadixTable.Cell key={cell.id} className={styles.contentCell}>
            {cell.content}
          </RadixTable.Cell>
        );
      })}
    </RadixTable.Row>
  );
};

export default TableRow;
export type { ITableRowProps };
