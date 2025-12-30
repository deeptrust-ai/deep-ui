import { Table as RadixTable, IconButton, Button } from '@radix-ui/themes';

import type { ITableRowProps } from './types';
import styles from './styles.module.css';

const TableRow = ({ id, cells, actions, active }: ITableRowProps) => {
  if (!cells || cells.length === 0) {
    return null;
  }

  return (
    <RadixTable.Row data-row-id={id} className={active ? styles.activeRow : undefined}>
      {cells.map((cell) => {
        return (
          <RadixTable.Cell key={cell.id} className={styles.contentCell}>
            {cell.content}
          </RadixTable.Cell>
        );
      })}

      {actions && actions.length > 0 && (
        <RadixTable.Cell className={styles.actionsCell}>
          {actions.map((action) =>
            action.icon ? (
              <IconButton
                key={action.label}
                color="blue"
                variant="soft"
                className={styles.actionButton}
                onClick={action.onClick}
                aria-label={action.label}
                size="1"
              >
                {<action.icon size={14} />}
              </IconButton>
            ) : (
              <Button
                key={action.label}
                color="blue"
                variant="soft"
                className={styles.actionButton}
                onClick={action.onClick}
                size="1"
              >
                {action.label}
              </Button>
            )
          )}
        </RadixTable.Cell>
      )}
    </RadixTable.Row>
  );
};

export default TableRow;
export type { ITableRowProps };
