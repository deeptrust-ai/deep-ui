import type { IToastProps } from '../../atom/Toast';

export interface IReviewAlertsProps {
  alerts: {
    message: IToastProps['message'];
    variant?: IToastProps['variant'];
  }[];
}
