import type { UsePaginationOptions } from '@mantine/hooks';
import type { PAGE_SIZE_OPTIONS } from './constants';

export interface IPaginationProps {
  currentPage: UsePaginationOptions['initialPage'];
  totalItems: UsePaginationOptions['total'];
  onPageChange: UsePaginationOptions['onChange'];
  defaultItemsPerPage?: (typeof PAGE_SIZE_OPTIONS)[number];
}
