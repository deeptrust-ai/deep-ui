import { Text as FrostedText, IconButton as FrostedIconButton } from '@radix-ui/themes';
import { useCallback, useState } from 'react';
import { usePagination } from '@mantine/hooks';
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';

import type { IPaginationProps, TPaginationItemsPerPage } from './types';
import styles from './styles.module.css';
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
    <div className={styles.container}>
      <div>
        <FrostedText size="3" color="gray">
          Showing {itemFrom} &mdash; {itemTo} of {totalItems}
        </FrostedText>
      </div>

      <div className={styles.pages}>
        <FrostedIconButton
          variant="ghost"
          size="2"
          disabled={pager.active === 1}
          onClick={pager.previous}
          color="gray"
          aria-label="Previous page"
        >
          <CaretLeftIcon />
        </FrostedIconButton>

        <Pager pager={pager} totalPages={totalPages} />

        <FrostedIconButton
          variant="ghost"
          size="2"
          disabled={pager.active === totalPages}
          onClick={pager.next}
          color="gray"
          aria-label="Next page"
        >
          <CaretRightIcon />
        </FrostedIconButton>
      </div>

      <div className={styles.itemsPerPage}>
        <RowsPerPage itemsPerPage={itemsPerPage} onChange={handlePerPageChange} />
      </div>
    </div>
  );
};

export default Pagination;
export type { IPaginationProps };
