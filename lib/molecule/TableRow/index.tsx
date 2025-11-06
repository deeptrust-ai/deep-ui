import { Table as FrostedTable, IconButton as FrostedIconButton } from 'frosted-ui';
import { CaretDoubleRightIcon } from '@phosphor-icons/react';

import type { ITableRowProps } from './types';
import styles from './styles.module.css';

const TableRow = ({ id, cells }: ITableRowProps) => {
  if (!cells || cells.length === 0) {
    return null;
  }

  return (
    <FrostedTable.Row data-row-id={id}>
      {cells.map((cell) => {
        if (typeof cell.content === 'function') {
          return (
            <FrostedTable.Cell key={cell.id}>
              <FrostedIconButton
                color="blue"
                variant="soft"
                className={styles.actionButton}
                onClick={cell.content}
                aria-label="Perform action"
              >
                <CaretDoubleRightIcon />
              </FrostedIconButton>
            </FrostedTable.Cell>
          );
        }

        return <FrostedTable.Cell key={cell.id}>{cell.content}</FrostedTable.Cell>;
      })}
    </FrostedTable.Row>
  );
};

export default TableRow;
export type { ITableRowProps };
