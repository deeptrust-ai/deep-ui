import { Table as RadixTable } from '@radix-ui/themes';

import type { ITableRowProps } from './types';
import styles from './styles.module.css';

const TableRow = ({ id, cells, onClickRow, active }: ITableRowProps) => {
  if (!cells || cells.length === 0) {
    return null;
  }

  return (
    <RadixTable.Row
      data-row-id={id}
      className={active ? styles.activeRow : undefined}
      onClick={onClickRow}
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
