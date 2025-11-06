import {
  Text as FrostedText,
  Select as FrostedSelect,
  Button as FrostedButton,
  IconButton as FrostedIconButton,
  DropdownMenu as FrostedDropdownMenu,
} from 'frosted-ui';
import cn from 'classnames';
import { useState } from 'react';
import { usePagination } from '@mantine/hooks';

import type { IPaginationProps } from './types';
import styles from './styles.module.css';
import { PAGE_SIZE_OPTIONS } from './constants';
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';

const Pagination = ({
  currentPage = 1,
  totalItems,
  defaultItemsPerPage = '10',
  onPageChange,
}: IPaginationProps) => {
  const [itemsPerPage, setItemsPerPage] = useState(Number(defaultItemsPerPage));
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const itemFrom = (currentPage - 1) * itemsPerPage + 1;
  const itemTo = Math.min(currentPage * itemsPerPage, totalItems);

  const pager = usePagination({
    total: totalPages,
    initialPage: currentPage,
    boundaries: 1,
    siblings: 1,
    onChange: (page) => onPageChange(page),
  });

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
                      <FrostedButton variant="soft">&hellip;</FrostedButton>
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
          disabled={currentPage === totalPages}
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
          defaultValue={`${itemsPerPage}`}
          size="3"
          onValueChange={(value) => {
            setItemsPerPage(Number(value));
            pager.setPage(1); // Reset to first page when items per page changes
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
