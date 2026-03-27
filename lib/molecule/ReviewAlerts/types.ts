import type { ICalloutProps } from '../../atom/Callout';

/** A single review alert, picking the message and variant from {@link ICalloutProps}. */
export type ReviewAlert = Pick<ICalloutProps, 'message' | 'variant'>;

/** Props for the {@link ReviewAlerts} molecule component. */
export interface IReviewAlertsProps {
  alerts: ReviewAlert[];
}
