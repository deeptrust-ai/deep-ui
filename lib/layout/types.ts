import type { ReactNode } from 'react';

interface IOneColumnLayoutProps {
  readonly Content?: null;
  readonly split?: never;
}

interface ITwoColumnLayoutProps {
  readonly Content: ReactNode;
  readonly split: 'half' | 'third';
}

export interface ILayoutComponent {
  readonly columns: IOneColumnLayoutProps | ITwoColumnLayoutProps;
  readonly children?: ReactNode;
}
