import type { Icon as PhosIconTypes } from '@phosphor-icons/react';

export interface ITextBarGraphProps {
  // Percentage value between 0 and 100
  readonly percentage: number;
  // Icon component from Phosphor Icons
  readonly Icon: PhosIconTypes;
  // Label for the bar graph
  readonly label: string;
  // Semantic variant for styling the bar graph
  readonly variant?: 'default' | 'danger' | 'info' | 'warning';
}
