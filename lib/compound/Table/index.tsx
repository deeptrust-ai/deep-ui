import { Table as FrostedTable, ScrollArea as FrostedScrollArea } from 'frosted-ui';
import type { ITableProps } from './types';
import { Pagination, TableRow } from '../..';
import styles from './styles.module.css';
import { useMemo, useState } from 'react';
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
  const [currentPage, setCurrentPage] = useState(initialPageProp ?? 1);

  const totalItemsMemo = totalItems ?? rows.length;

  const numericItemsPerPage = Number(itemsPerPage);
  const startIndex = Math.max(0, (currentPage - 1) * numericItemsPerPage);
  const endIndex = startIndex + numericItemsPerPage;

  const handleItemsPerPageChange = (newItemsPerPage: TPaginationItemsPerPage) => {
    // Check if value is a valid TPaginationItemsPerPage
    if (PAGE_SIZE_OPTIONS.includes(newItemsPerPage)) {
      setItemsPerPage(newItemsPerPage);
      setCurrentPage(1);
      onItemsPerPageChangeProp?.(newItemsPerPage as TPaginationItemsPerPage);
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    onPageChangeProp?.(newPage);
  };

  const validRows = useMemo(
    () =>
      rows.filter((row, index) => {
        if (!row.cells || row.cells.length !== headers.length) {
          console.warn(`TableRow with index "${index}" has cell/header mismatch`, row);
          return false;
        }
        return true;
      }),
    [headers.length, rows]
  );
  const rowsPerPage = validRows.slice(startIndex, endIndex);

  return (
    <div className={styles.container}>
      <FrostedTable.Root size="1" className={styles.table} variant="surface">
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
              {rowsPerPage.map((row) => (
                <TableRow key={row.id} {...row} />
              ))}
            </FrostedTable.Body>
          </FrostedTable.Table>
        </FrostedScrollArea>
      </FrostedTable.Root>
      <Pagination
        totalItems={totalItemsMemo}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
        initialPage={initialPageProp}
        defaultItemsPerPage={itemsPerPage}
      />
    </div>
  );
};

export default Table;
export type { ITableProps };
