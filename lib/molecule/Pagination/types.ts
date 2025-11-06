import type { UsePaginationOptions } from '@mantine/hooks';
import type { PAGE_SIZE_OPTIONS } from './constants';

export interface IPaginationProps {
  totalItems: UsePaginationOptions['total'];
  onPageChange?: UsePaginationOptions['onChange'];
  initialPage?: UsePaginationOptions['initialPage'];
  defaultItemsPerPage?: (typeof PAGE_SIZE_OPTIONS)[number];
}
