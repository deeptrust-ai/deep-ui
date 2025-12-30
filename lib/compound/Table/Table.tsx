import { Flex, Table as RadixTable } from '@radix-ui/themes';
import type { ITableProps } from './Table.types';
import { Pagination, TableRow } from '../..';
import styles from './Table.module.css';
import { useMemo, useState } from 'react';
import { PAGE_SIZE_OPTIONS } from '../../molecule/Pagination/constants';
import type { TPaginationItemsPerPage } from '../../molecule/Pagination/types';
import TableEmpty from '../../molecule/TableRow/TableEmpty';

const Table = ({
  headers,
  rows,
  totalItems = 0,
  onItemsPerPageChange: onItemsPerPageChangeProp,
  onPageChange: onPageChangeProp,
  defaultItemsPerPage: defaultItemsPerPageProp,
}: ITableProps) => {
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPageProp ?? PAGE_SIZE_OPTIONS[1]);
  const [currentPage, setCurrentPage] = useState(1);

  const totalItemsMemo = totalItems ?? rows.length;
  const numericItemsPerPage = Number(itemsPerPage) || Number(PAGE_SIZE_OPTIONS[1]);

  const startIndex = Math.max(0, (currentPage - 1) * numericItemsPerPage);
  const endIndex = startIndex + numericItemsPerPage;

  const handleItemsPerPageChange = (newItemsPerPage: TPaginationItemsPerPage) => {
    if (PAGE_SIZE_OPTIONS.includes(newItemsPerPage)) {
      setItemsPerPage(newItemsPerPage);
      setCurrentPage(1);
      onItemsPerPageChangeProp?.(newItemsPerPage);
    }

    // scroll to top of table on items per page change
    const tableElement = document.querySelector(`.${styles.table}`);
    if (tableElement) {
      tableElement.scrollTo({ top: 0, behavior: 'smooth' });
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

  const showActionsColumns = useMemo(
    () => validRows.some((row) => row.actions && row.actions.length > 0),
    [validRows]
  );

  return (
    <Flex direction="column" gap="2">
      <RadixTable.Root size="1" className={styles.table} variant="surface">
        <RadixTable.Header>
          <RadixTable.Row className={styles.headerRow}>
            {headers.map((header) => (
              <RadixTable.ColumnHeaderCell key={`${header}`}>{header}</RadixTable.ColumnHeaderCell>
            ))}
            {showActionsColumns && <RadixTable.ColumnHeaderCell />}
          </RadixTable.Row>
        </RadixTable.Header>
        <RadixTable.Body>
          {rowsPerPage.length ? (
            rowsPerPage.map((row) => <TableRow key={row.id} {...row} />)
          ) : (
            <TableEmpty colSpan={headers.length + (showActionsColumns ? 1 : 0)} />
          )}
        </RadixTable.Body>
      </RadixTable.Root>
      <Pagination
        totalItems={totalItemsMemo}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </Flex>
  );
};

export default Table;
export type { ITableProps };
