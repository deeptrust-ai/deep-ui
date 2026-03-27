import type { Icon as PhosIconTypes } from '@phosphor-icons/react';

/** Props for the {@link TextBarGraph} molecule component. */
export interface ITextBarGraphProps {
  /** Percentage value between 0 and 100. */
  readonly percentage: number;
  /** Phosphor icon component rendered beside the label. */
  readonly Icon: PhosIconTypes;
  /** Text label displayed next to the bar. */
  readonly label: string;
  /** Semantic colour variant for the bar fill. */
  readonly variant?: 'default' | 'danger' | 'info' | 'warning';
}
