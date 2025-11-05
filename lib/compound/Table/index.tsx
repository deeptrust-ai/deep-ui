import {
  Table as FrostedTable,
  ScrollArea as FrostedScrollArea,
  Badge as FrostedBadge,
  Text as FrostedText,
} from 'frosted-ui';
import type { ITableProps } from './types';

const Table = (props: ITableProps) => {
  return (
    <div>
      <FrostedTable.Root
        size="2"
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
                <FrostedTable.RowHeaderCell>Pizza</FrostedTable.RowHeaderCell>
                <FrostedTable.Cell>
                  <FrostedBadge color="green">In stock</FrostedBadge>
                </FrostedTable.Cell>
                <FrostedTable.Cell>Tesco</FrostedTable.Cell>
                <FrostedTable.Cell>$20</FrostedTable.Cell>
                <FrostedTable.Cell>$2</FrostedTable.Cell>
                <FrostedTable.Cell></FrostedTable.Cell>
              </FrostedTable.Row>
            </FrostedTable.Body>
          </FrostedTable.Table>
        </FrostedScrollArea>
        <FrostedTable.BottomBar></FrostedTable.BottomBar>
      </FrostedTable.Root>
    </div>
  );
};

export default Table;
export type { ITableProps };
