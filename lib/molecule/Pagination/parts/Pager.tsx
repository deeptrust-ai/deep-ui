import React from 'react';
import cn from 'classnames';
import Ellipsis from './Ellipsis';
import { Button as FrostedButton } from 'frosted-ui';
import styles from '../styles.module.css';

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
    <ul className={styles.pageList} aria-label={`Pagination, ${totalPages} pages`}>
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
            <li key={`dots-${index}`} className={cn(styles.button, styles.dots)}>
              <Ellipsis pages={pagesBetween} setPage={pager.setPage} />
            </li>
          );
        }

        return (
          <li key={page}>
            <FrostedButton
              variant={isCurrent ? 'soft' : 'ghost'}
              color="gray"
              size="2"
              onClick={() => pager.setPage(page as number)}
              aria-label={`Page ${page}`}
              aria-current={isCurrent ? 'page' : undefined}
            >
              {page}
            </FrostedButton>
          </li>
        );
      })}
    </ul>
  );
};

export default Pager;
