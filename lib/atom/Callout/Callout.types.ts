export type CalloutVariant = 'success' | 'error' | 'info' | 'warning';

export interface ICalloutProps {
  // Optional title of the Callout
  readonly title?: string;
  // Message/body of the Callout
  readonly message: string;
  // Optional handler to render actions/buttons
  readonly onClick?: () => void;
  // Variant/type of the Callout
  readonly variant?: CalloutVariant;
}
