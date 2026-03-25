import { Button, Flex, Table as RadixTable } from '@radix-ui/themes';
import type { KeyboardEvent } from 'react';

import type { ITableRowProps } from './types';
import styles from './styles.module.css';
import cn from 'classnames';

const TableRow = ({ name, id, cells, onClickRow, selected, active, actions }: ITableRowProps) => {
  if (!cells || cells.length === 0) {
    return null;
  }

  const isSelected = selected ?? active;
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
      className={cn({ [styles.row]: isClickable, [styles.selectedRow]: isSelected })}
      onClick={onClickRow}
      onKeyDown={isClickable ? handleKeyDown : undefined}
      tabIndex={isClickable ? 0 : undefined}
      aria-label={name ?? id}
      aria-selected={isSelected || undefined}
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
          <Flex justify="end" gap="2" wrap="wrap">
            {actions.map((action) => {
              const IconComponent = action.icon;

              return (
                <Button
                  key={action.label}
                  type="button"
                  size="1"
                  variant="outline"
                  className={styles.actionButton}
                  onClick={(event) => {
                    event.stopPropagation();
                    action.onClick();
                  }}
                >
                  {IconComponent ? <IconComponent size={14} /> : null}
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
