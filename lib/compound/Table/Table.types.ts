import type { ITableRowProps } from '../../molecule/TableRow/types';
import type { IPaginationProps } from '../../molecule/Pagination/types';

/** Props for the {@link Table} compound component. */
export interface ITableProps extends Partial<IPaginationProps> {
  readonly headers: React.ReactNode[];
  readonly rows: ITableRowProps[];
}
