import { Text, IconButton, Flex } from '@radix-ui/themes';
import { useCallback, useState } from 'react';
import { usePagination } from '@mantine/hooks';
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';
import styles from './Pagination.module.css';

import type { IPaginationProps, TPaginationItemsPerPage } from './types';

import { PAGE_SIZE_OPTIONS } from './constants';
import RowsPerPage from './parts/RowsPerPage';
import Pager from './parts/Pager';

export const Pagination = ({
  initialPage = 1,
  totalItems,
  defaultItemsPerPage = '10',
  onPageChange = () => {},
  onItemsPerPageChange = () => {},
}: IPaginationProps) => {
  const [itemsPerPage, setItemsPerPage] = useState<TPaginationItemsPerPage>(defaultItemsPerPage);
  const numItemsPerPage = Number(itemsPerPage);
  const totalPages = Math.ceil(totalItems / numItemsPerPage);

  const pager = usePagination({
    total: totalPages,
    initialPage,
    boundaries: 1,
    siblings: 1,
    onChange: onPageChange,
  });

  const itemFrom = (pager.active - 1) * numItemsPerPage + 1;
  const itemTo = Math.min(pager.active * numItemsPerPage, totalItems);

  const handlePerPageChange = useCallback(
    (value: TPaginationItemsPerPage) => {
      if (PAGE_SIZE_OPTIONS.includes(value)) {
        setItemsPerPage(value);
        onItemsPerPageChange(value);
        pager.setPage(1);
      }
    },
    [onItemsPerPageChange, pager]
  );

  return (
    <Flex align="center">
      <Text size="3" color="gray">
        Showing {itemFrom} &mdash; {itemTo} of {totalItems}
      </Text>

      <Flex justify="center" align="center" gap="1" flexGrow="1">
        <IconButton
          variant="outline"
          size="2"
          disabled={pager.active === 1}
          onClick={pager.previous}
          color="gray"
          aria-label="Previous page"
          className={styles.button}
        >
          <CaretLeftIcon />
        </IconButton>

        <Pager pager={pager} totalPages={totalPages} />

        <IconButton
          variant="outline"
          size="2"
          disabled={pager.active === totalPages}
          onClick={pager.next}
          color="gray"
          aria-label="Next page"
          className={styles.button}
        >
          <CaretRightIcon />
        </IconButton>
      </Flex>

      <Flex gap="1" align="center">
        <RowsPerPage itemsPerPage={itemsPerPage} onChange={handlePerPageChange} />
      </Flex>
    </Flex>
  );
};

export default Pagination;
export type { IPaginationProps };
