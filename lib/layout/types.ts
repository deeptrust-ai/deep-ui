import type { ReactNode } from 'react';
import type { ISidebarMenu } from '../compound/Sidebar/types';

export interface ILayoutComponent {
  readonly sidebar: ReactNode;
  readonly children?: ReactNode;
  readonly menuPages?: ISidebarMenu['menuPages'];
}
