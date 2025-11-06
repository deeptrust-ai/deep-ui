import type { UsePaginationOptions } from '@mantine/hooks';
import type { PAGE_SIZE_OPTIONS } from './constants';

export type TPaginationItemsPerPage = (typeof PAGE_SIZE_OPTIONS)[number];
export interface IPaginationProps {
  totalItems: UsePaginationOptions['total'];
  onPageChange?: UsePaginationOptions['onChange'];
  onItemsPerPageChange?: (itemsPerPage: TPaginationItemsPerPage) => void;
  initialPage?: UsePaginationOptions['initialPage'];
  defaultItemsPerPage?: TPaginationItemsPerPage;
}
