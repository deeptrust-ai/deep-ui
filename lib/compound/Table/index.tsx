import {
  Table as FrostedTable,
  ScrollArea as FrostedScrollArea,
  Badge as FrostedBadge,
  Text as FrostedText,
} from 'frosted-ui';
import type { ITableProps } from './types';
import { Pagination, TableRow } from '../..';
import styles from './styles.module.css';

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
              <FrostedTable.Row className={styles.headerRow}>
                <FrostedTable.ColumnHeaderCell>Event</FrostedTable.ColumnHeaderCell>
                <FrostedTable.ColumnHeaderCell>Severity</FrostedTable.ColumnHeaderCell>
                <FrostedTable.ColumnHeaderCell>Date</FrostedTable.ColumnHeaderCell>
                <FrostedTable.ColumnHeaderCell>Organization</FrostedTable.ColumnHeaderCell>
                <FrostedTable.ColumnHeaderCell>Status</FrostedTable.ColumnHeaderCell>
                <FrostedTable.ColumnHeaderCell></FrostedTable.ColumnHeaderCell>
              </FrostedTable.Row>
            </FrostedTable.Header>
            <FrostedTable.Body>
              <TableRow
                cells={[
                  <>
                    <FrostedText size="3" weight="medium" as="p">
                      Deepfake Detected
                    </FrostedText>
                    <FrostedText size="2" weight="regular">
                      Attendees: Sean, Noah, Aman
                    </FrostedText>
                  </>,
                  <FrostedBadge color="danger">Critical</FrostedBadge>,
                  'Dec 26th, 2024',
                  'Exclusive',
                  'Default',
                ]}
              />
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
