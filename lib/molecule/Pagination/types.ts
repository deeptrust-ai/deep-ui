import type { PAGE_SIZE_OPTIONS } from './constants';

export interface IPaginationProps {
  currentPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  defaultItemsPerPage?: (typeof PAGE_SIZE_OPTIONS)[number];
}
