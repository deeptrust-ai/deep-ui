import type { ITableRowProps } from '../../molecule/TableRow/types';
import type { IPaginationProps } from '../../molecule/Pagination/types';

export interface ITableProps extends Partial<IPaginationProps> {
  readonly headers: React.ReactNode[];
  readonly rows: ITableRowProps[];
}
