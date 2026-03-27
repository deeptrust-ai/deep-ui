/** Visual variant controlling the color and icon of a {@link Callout}. */
export type CalloutVariant = 'success' | 'error' | 'info' | 'warning';

/** Props for the {@link Callout} atom component. */
export interface ICalloutProps {
  /** Optional title displayed above the message. */
  readonly title?: string;
  /** Primary message body of the callout. */
  readonly message: string;
  /** Optional click handler for the action button. */
  readonly onClick?: () => void;
  /** Visual variant controlling color and icon (defaults to `"info"`). */
  readonly variant?: CalloutVariant;
}
