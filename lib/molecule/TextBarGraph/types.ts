import type { Icon as PhosIconTypes } from '@phosphor-icons/react';

export interface ITextBarGraphProps {
  readonly percentage: number;
  readonly Icon: PhosIconTypes;
  readonly label: string;
  readonly variant?: 'default' | 'danger' | 'info' | 'warning';
}
