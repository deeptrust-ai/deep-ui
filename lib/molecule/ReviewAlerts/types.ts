import type { IToastProps } from '../../atom/Toast';

export type ReviewAlert = Pick<IToastProps, 'message' | 'variant'>;

export interface IReviewAlertsProps {
  alerts: ReviewAlert[];
}
