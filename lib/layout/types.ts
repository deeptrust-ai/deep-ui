import type { ReactNode } from 'react';

export interface ILayoutComponent {
  readonly sidebar: ReactNode;
  readonly children?: ReactNode;
}
