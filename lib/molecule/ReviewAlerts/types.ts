import type { ICalloutProps } from '../../atom/Callout';

export type ReviewAlert = Pick<ICalloutProps, 'message' | 'variant'>;

export interface IReviewAlertsProps {
  alerts: ReviewAlert[];
}
