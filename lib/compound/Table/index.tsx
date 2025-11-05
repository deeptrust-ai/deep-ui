import {
  Table as FrostedTable,
  ScrollArea as FrostedScrollArea,
  Badge as FrostedBadge,
  Text as FrostedText,
} from 'frosted-ui';
import type { ITableProps } from './types';
import { NextButton, PageButton, Pagination, PrevButton } from 'react-headless-pagination';

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
        <FrostedTable.BottomBar>
          <Pagination
            className=""
            currentPage={0}
            edgePageCount={2}
            middlePagesSiblingCount={1}
            setCurrentPage={function noRefCheck() {}}
            totalPages={10}
            truncableClassName=""
            truncableText="..."
          >
            <PrevButton className="">Previous</PrevButton>
            <div className="flex items-center justify-center flex-grow">
              <PageButton activeClassName="" className="" inactiveClassName="" />
            </div>
            <NextButton className="">Next</NextButton>
          </Pagination>
        </FrostedTable.BottomBar>
      </FrostedTable.Root>
    </div>
  );
};

export default Table;
export type { ITableProps };
