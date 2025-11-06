import { Table as FrostedTable, IconButton as FrostedIconButton } from 'frosted-ui';
import { CaretDoubleRightIcon } from '@phosphor-icons/react';

import type { ITableRowProps } from './types';
import styles from './styles.module.css';

const TableRow = ({ cells }: ITableRowProps) => {
  if (!cells || cells.length === 0) {
    return null;
  }

  return (
    <FrostedTable.Row>
      {cells.map((cell, index) => {
        if (typeof cell === 'function') {
          return (
            <FrostedTable.Cell key={index}>
              <FrostedIconButton
                color="blue"
                variant="soft"
                className={styles.actionButton}
                onClick={cell}
              >
                <CaretDoubleRightIcon />
              </FrostedIconButton>
            </FrostedTable.Cell>
          );
        }

        return <FrostedTable.Cell key={index}>{cell}</FrostedTable.Cell>;
      })}
    </FrostedTable.Row>
  );
};

export default TableRow;
export type { ITableRowProps };
