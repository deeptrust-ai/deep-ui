import React from 'react';
import Ellipsis from './Ellipsis';
import { Flex, IconButton } from '@radix-ui/themes';
import styles from '../Pagination.module.css';

type PagerRangeItem = number | 'dots';

export interface PagerState {
  range: PagerRangeItem[];
  active: number;
  setPage: (page: number) => void;
}

interface PagerProps {
  pager: PagerState;
  totalPages: number;
}

const Pager: React.FC<PagerProps> = ({ pager, totalPages }) => {
  return (
    <Flex align="center" gap="1" aria-label={`Pagination, ${totalPages} pages`}>
      {pager.range.map((page, index) => {
        const isCurrent = page === pager.active;
        if (page === 'dots') {
          const pageBeforeDot = Number(pager.range[index - 1]) + 1;
          const pageAfterDot = Number(pager.range[index + 1]) - 1;
          const pagesBetween = [] as number[];
          for (let i = pageBeforeDot; i <= pageAfterDot; i++) {
            pagesBetween.push(i);
          }

          return (
            <Flex key={`dots-${index}`} align="center" justify="center" height="32px" asChild>
              <Ellipsis pages={pagesBetween} setPage={pager.setPage} />
            </Flex>
          );
        }

        return (
          <Flex key={page} asChild align="center" justify="center">
            <IconButton
              variant={isCurrent ? 'soft' : 'outline'}
              color="gray"
              size="2"
              onClick={() => pager.setPage(page as number)}
              aria-label={`Page ${page}`}
              aria-current={isCurrent ? 'page' : undefined}
              className={styles.button}
            >
              {page}
            </IconButton>
          </Flex>
        );
      })}
    </Flex>
  );
};

export default Pager;
