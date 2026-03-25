import { Table as RadixTable } from '@radix-ui/themes';

import type { ITableRowProps } from './types';
import styles from './styles.module.css';
import cn from 'classnames';

const TableRow = ({ name, id, cells, onClickRow, selected }: ITableRowProps) => {
  if (!cells || cells.length === 0) {
    return null;
  }

  return (
    <RadixTable.Row
      data-row-id={id}
      className={cn({ [styles.row]: onClickRow, [styles.selectedRow]: selected })}
      onClick={onClickRow}
      aria-label={name}
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
