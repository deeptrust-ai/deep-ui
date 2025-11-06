import {
  Text as FrostedText,
  Select as FrostedSelect,
  Button as FrostedButton,
  IconButton as FrostedIconButton,
  DropdownMenu as FrostedDropdownMenu,
} from 'frosted-ui';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import { usePagination } from '@mantine/hooks';
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';

import type { IPaginationProps, TPaginationItemsPerPage } from './types';
import styles from './styles.module.css';
import { PAGE_SIZE_OPTIONS } from './constants';

const Pagination = ({
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
    onChange: (page) => onPageChange(page),
  });

  const itemFrom = (pager.active - 1) * numItemsPerPage + 1;
  const itemTo = Math.min(pager.active * numItemsPerPage, totalItems);

  useEffect(() => {
    onItemsPerPageChange(itemsPerPage); // Notify parent of items per page change
    pager.setPage(1); // Reset to first page when items per page changes
  }, [itemsPerPage, onItemsPerPageChange, pager]);

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
        >
          <CaretLeftIcon />
        </FrostedIconButton>

        <ul className={styles.pageList}>
          {pager.range.map((page, index) => {
            const isCurrent = page === pager.active;
            if (page === 'dots') {
              const pageBeforeDot = Number(pager.range[index - 1]) + 1;
              const pageAfterDot = Number(pager.range[index + 1]) - 1;
              const pagesBetween = [];
              for (let i = pageBeforeDot; i <= pageAfterDot; i++) {
                pagesBetween.push(i);
              }

              return (
                <li key={`dots-${index}`} className={cn(styles.button, styles.dots)}>
                  <FrostedDropdownMenu.Root>
                    <FrostedDropdownMenu.Trigger>
                      <FrostedButton variant="ghost" color="gray">
                        &hellip;
                      </FrostedButton>
                    </FrostedDropdownMenu.Trigger>
                    <FrostedDropdownMenu.Content size="2" variant="translucent">
                      {pagesBetween.map((p) => (
                        <FrostedDropdownMenu.Item key={p} onClick={() => pager.setPage(p)}>
                          {p}
                        </FrostedDropdownMenu.Item>
                      ))}
                    </FrostedDropdownMenu.Content>
                  </FrostedDropdownMenu.Root>
                </li>
              );
            }
            return (
              <li key={page}>
                <FrostedButton
                  variant={isCurrent ? 'soft' : 'ghost'}
                  color="gray"
                  size="2"
                  onClick={() => pager.setPage(page)}
                >
                  {page}
                </FrostedButton>
              </li>
            );
          })}
        </ul>
        <FrostedIconButton
          variant="ghost"
          size="2"
          disabled={pager.active === totalPages}
          onClick={pager.next}
          color="gray"
        >
          <CaretRightIcon />
        </FrostedIconButton>
      </div>

      <div className={styles.itemsPerPage}>
        <FrostedText size="3" color="gray">
          Show
        </FrostedText>
        <FrostedSelect.Root
          value={itemsPerPage}
          size="3"
          onValueChange={(value) => {
            // Check if value is a valid TPaginationItemsPerPage
            if (PAGE_SIZE_OPTIONS.includes(value as TPaginationItemsPerPage)) {
              setItemsPerPage(value as TPaginationItemsPerPage);
            }
          }}
        >
          <FrostedSelect.Trigger variant="surface" />
          <FrostedSelect.Content>
            {PAGE_SIZE_OPTIONS.map((size) => (
              <FrostedSelect.Item key={size} value={size}>
                {size}
              </FrostedSelect.Item>
            ))}
          </FrostedSelect.Content>
        </FrostedSelect.Root>
      </div>
    </div>
  );
};

export default Pagination;
export type { IPaginationProps };
