import {
  Table as FrostedTable,
  IconButton as FrostedIconButton,
  Button as FrostedButton,
} from 'frosted-ui';

import type { ITableRowProps } from './types';
import styles from './styles.module.css';

const TableRow = ({ id, cells, actions }: ITableRowProps) => {
  if (!cells || cells.length === 0) {
    return null;
  }

  return (
    <FrostedTable.Row data-row-id={id}>
      {cells.map((cell) => {
        return <FrostedTable.Cell key={cell.id}>{cell.content}</FrostedTable.Cell>;
      })}

      {actions && actions.length > 0 && (
        <FrostedTable.Cell className={styles.actionsCell}>
          {actions.map((action) =>
            action.icon ? (
              <FrostedIconButton
                key={action.label}
                color="blue"
                variant="soft"
                className={styles.actionButton}
                onClick={action.onClick}
                aria-label={action.label}
              >
                {<action.icon size={16} />}
              </FrostedIconButton>
            ) : (
              <FrostedButton
                key={action.label}
                color="blue"
                variant="soft"
                className={styles.actionButton}
                onClick={action.onClick}
              >
                {action.label}
              </FrostedButton>
            )
          )}
        </FrostedTable.Cell>
      )}
    </FrostedTable.Row>
  );
};

export default TableRow;
export type { ITableRowProps };
