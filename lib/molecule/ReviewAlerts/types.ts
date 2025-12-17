import type { IToastProps } from '../../atom/Callout';

export type ReviewAlert = Pick<IToastProps, 'message' | 'variant'>;

export interface IReviewAlertsProps {
  alerts: ReviewAlert[];
}
