import React, { ReactNode, CSSProperties } from "react";

export interface ITableProps {
  export interface ITableColumn<T = any> {
    key: string;
    title: ReactNode;
    dataIndex?: keyof T | string;
    width?: number | string;
    align?: "left" | "center" | "right";
    render?: (value: any, record: T, index: number) => ReactNode;
    sorter?: boolean | ((a: T, b: T) => number);
    sortOrder?: "asc" | "desc" | null;
    filters?: { text: string; value: any }[];
    filteredValue?: any[] | null;
    onFilter?: (value: any, record: T) => boolean;
    fixed?: "left" | "right" | boolean;
    ellipsis?: boolean;
    className?: string;
    resizable?: boolean;
  }

  export interface IRowSelection<T = any> {
    type?: "checkbox" | "radio";
    selectedRowKeys?: React.Key[];
    onChange?: (selectedRowKeys: React.Key[], selectedRows: T[]) => void;
    getCheckboxProps?: (record: T) => { disabled?: boolean; [key: string]: any };
  }

  export interface IPagination {
    pageSize?: number;
    current?: number;
    total?: number;
    pageSizeOptions?: number[];
    showSizeChanger?: boolean;
    onChange?: (page: number, pageSize?: number) => void;
  }

  export interface IExpandable<T = any> {
    expandedRowRender?: (record: T) => ReactNode;
    rowExpandable?: (record: T) => boolean;
    defaultExpandedRowKeys?: React.Key[];
  }

  export interface ITableProps<T = any> {
    // core table shape
    columns: { readonly title: string; }[];
    data: T[];

    // row identification & styling
    rowKey?: keyof T | ((record: T) => React.Key);
    rowClassName?: (record: T, index: number) => string | undefined;
    rowStyle?: (record: T, index: number) => CSSProperties | undefined;

    // row events
    onRowClick?: (record: T, index: number, event?: React.MouseEvent) => void;
    onRowDoubleClick?: (record: T, index: number, event?: React.MouseEvent) => void;
    onRowMouseEnter?: (record: T, index: number, event?: React.MouseEvent) => void;
    onRowMouseLeave?: (record: T, index: number, event?: React.MouseEvent) => void;

    // selection / expansion
    rowSelection?: IRowSelection<T> | null;
    expandable?: IExpandable<T>;

    // sorting / filtering hooks (per-column sort/filter also supported in ITableColumn)
    onSortChange?: (columnKey: string, order: "asc" | "desc" | null) => void;
    onFilterChange?: (filters: Record<string, any[]>) => void;

    // pagination and loading
    pagination?: IPagination | false;
    loading?: boolean;

    // presentation / behavior
    sticky?: boolean | { offsetHeader?: number; offsetScroll?: number };
    virtual?: boolean;
    rowHeight?: number | ((record: T, index: number) => number);
    emptyNode?: ReactNode;

    // misc
    className?: string;
    style?: CSSProperties;
  }
}
