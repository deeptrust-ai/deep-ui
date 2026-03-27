import type { UsePaginationOptions } from '@mantine/hooks';
import type { PAGE_SIZE_OPTIONS } from './constants';

/** Allowed items-per-page values derived from {@link PAGE_SIZE_OPTIONS}. */
export type TPaginationItemsPerPage = (typeof PAGE_SIZE_OPTIONS)[number];
/** Props for the {@link Pagination} molecule component. */
export interface IPaginationProps {
  totalItems: UsePaginationOptions['total'];
  onPageChange?: UsePaginationOptions['onChange'];
  onItemsPerPageChange?: (itemsPerPage: TPaginationItemsPerPage) => void;
  initialPage?: UsePaginationOptions['initialPage'];
  defaultItemsPerPage?: TPaginationItemsPerPage;
}
