export interface IToastProps {
  // Optional title of the toast
  readonly title?: string;
  // Message/body of the toast
  readonly message: string;
  // Duration in milliseconds, 0 means it stays until dismissed
  readonly duration?: number;
  readonly variant?: 'success' | 'error' | 'info' | 'warning';
}
