import { Table as FrostedTable, ScrollArea as FrostedScrollArea } from 'frosted-ui';
import type { ITableProps } from './types';
import { Pagination, TableRow } from '../..';
import styles from './styles.module.css';
import { useCallback, useMemo, useState } from 'react';
import { PAGE_SIZE_OPTIONS } from '../../molecule/Pagination/constants';
import type { TPaginationItemsPerPage } from '../../molecule/Pagination/types';

const Table = ({
  headers,
  rows,
  totalItems,
  onItemsPerPageChange: onItemsPerPageChangeProp,
  onPageChange: onPageChangeProp,
  initialPage: initialPageProp,
  defaultItemsPerPage: defaultItemsPerPageProp,
}: ITableProps) => {
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPageProp);

  rows.forEach((row, index) => {
    if (!row.cells || row.cells.length !== headers.length) {
      // eslint-disable-next-line no-console
      console.warn(`TableRow with index "${index}" has cell/header mismatch`, row);
      return null;
    }
  });

  const totalItemsMemo = totalItems ?? rows.length;

  const rowsPerPage = rows.slice(0, Number(itemsPerPage));

  const handleItemsPerPageChange = useCallback((newItemsPerPage: TPaginationItemsPerPage) => {
    // Check if value is a valid TPaginationItemsPerPage
    if (PAGE_SIZE_OPTIONS.includes(newItemsPerPage)) {
      setItemsPerPage(newItemsPerPage);
      onItemsPerPageChangeProp(newItemsPerPage as TPaginationItemsPerPage);
    }
  }, []);

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
                {headers.map((header, index) => (
                  <FrostedTable.ColumnHeaderCell key={index}>
                    {header}
                  </FrostedTable.ColumnHeaderCell>
                ))}
              </FrostedTable.Row>
            </FrostedTable.Header>
            <FrostedTable.Body>
              {rowsPerPage.map((row, idx) => (
                <TableRow key={`row-${idx}`} cells={row.cells} />
              ))}
            </FrostedTable.Body>
          </FrostedTable.Table>
        </FrostedScrollArea>
      </FrostedTable.Root>
      <Pagination
        totalItems={totalItemsMemo}
        onPageChange={onPageChangeProp}
        onItemsPerPageChange={handleItemsPerPageChange}
        initialPage={initialPageProp}
        defaultItemsPerPage={itemsPerPage}
      />
    </div>
  );
};

export default Table;
export type { ITableProps };
