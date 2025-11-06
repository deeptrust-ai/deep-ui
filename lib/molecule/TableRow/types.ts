export interface ITableRowProps {
  readonly id: string;
  readonly cells: {
    id: string;
    content: React.ReactNode | (() => void);
  }[];
}
