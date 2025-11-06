import {
  Table as FrostedTable,
  ScrollArea as FrostedScrollArea,
  Badge as FrostedBadge,
  Text as FrostedText,
  IconButton as FrostedIconButton,
} from 'frosted-ui';
import type { ITableProps } from './types';
import { Pagination } from '../..';
import styles from './styles.module.css';
import { CaretDoubleRightIcon } from '@phosphor-icons/react';

const Table = (props: ITableProps) => {
  return (
    <div className={styles.container}>
      <FrostedTable.Root
        size="1"
        style={{
          minWidth: 400,
          whiteSpace: 'nowrap',
        }}
        variant="surface"
      >
        <FrostedScrollArea scrollbars="horizontal">
          <FrostedTable.Table>
            <FrostedTable.Header>
              <FrostedTable.Row>
                <FrostedTable.ColumnHeaderCell>Event</FrostedTable.ColumnHeaderCell>
                <FrostedTable.ColumnHeaderCell>Severity</FrostedTable.ColumnHeaderCell>
                <FrostedTable.ColumnHeaderCell>Date</FrostedTable.ColumnHeaderCell>
                <FrostedTable.ColumnHeaderCell>Organization</FrostedTable.ColumnHeaderCell>
                <FrostedTable.ColumnHeaderCell>Status</FrostedTable.ColumnHeaderCell>
                <FrostedTable.ColumnHeaderCell></FrostedTable.ColumnHeaderCell>
              </FrostedTable.Row>
            </FrostedTable.Header>
            <FrostedTable.Body>
              <FrostedTable.Row>
                <FrostedTable.Cell>
                  <FrostedText size="3" weight="medium" as="p">
                    Deepfake Detected
                  </FrostedText>
                  <FrostedText size="2" weight="regular">
                    Attendees: Sean, Noah, Aman
                  </FrostedText>
                </FrostedTable.Cell>
                <FrostedTable.Cell>
                  <FrostedBadge color="danger">Critical</FrostedBadge>
                </FrostedTable.Cell>
                <FrostedTable.Cell>Dec 26th, 2024</FrostedTable.Cell>
                <FrostedTable.Cell>Exclusive</FrostedTable.Cell>
                <FrostedTable.Cell>Default</FrostedTable.Cell>
                <FrostedTable.Cell align="right">
                  <FrostedIconButton color="blue" variant="soft" className={styles.actionButton}>
                    <CaretDoubleRightIcon />
                  </FrostedIconButton>
                </FrostedTable.Cell>
              </FrostedTable.Row>
            </FrostedTable.Body>
          </FrostedTable.Table>
        </FrostedScrollArea>
      </FrostedTable.Root>
      <Pagination totalItems={100} onPageChange={(page) => console.log(page)} />
    </div>
  );
};

export default Table;
export type { ITableProps };
