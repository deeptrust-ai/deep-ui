export interface ITextBarGraphProps {
  readonly percentage: number;
  readonly icon: React.ReactNode;
  readonly label: string;
  readonly variant?: 'default' | 'danger' | 'info' | 'warning';
}
