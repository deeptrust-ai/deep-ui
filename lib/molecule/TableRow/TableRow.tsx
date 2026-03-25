import { Button, Flex, Table as RadixTable } from '@radix-ui/themes';
import type { KeyboardEvent } from 'react';

import type { ITableRowProps } from './types';
import styles from './styles.module.css';
import cn from 'classnames';

const TableRow = ({ name, id, cells, actions, onClickRow, selected }: ITableRowProps) => {
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
      {actions?.length ? (
        <RadixTable.Cell className={styles.actionsCell}>
          <Flex justify="end" gap="2">
            {actions.map((action) => {
              const ActionIcon = action.icon;

              return (
                <Button
                  key={action.label}
                  variant="soft"
                  color="gray"
                  size="1"
                  onClick={(event) => {
                    event.stopPropagation();
                    action.onClick();
                  }}
                >
                  {ActionIcon ? <ActionIcon size={14} /> : null}
                  {action.label}
                </Button>
              );
            })}
          </Flex>
        </RadixTable.Cell>
      ) : null}
    </RadixTable.Row>
  );
};

export default TableRow;
export type { ITableRowProps };
