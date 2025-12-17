import {
  Provider as RadixToastProvider,
  Viewport as RadixToastViewport,
} from '@radix-ui/react-toast';
import { ListChecksIcon } from '@phosphor-icons/react';
import {
  Link as FrostedLink,
  Text as FrostedText,
  Heading as FrostedHeading,
} from '@radix-ui/themes';
import Toast from '../../atom/Toast';
import type { IReviewAlertsProps } from './types';
import styles from './styles.module.css';

const ReviewAlerts = ({ alerts }: IReviewAlertsProps) => {
  return (
    <div>
      <div className={styles.header}>
        <ListChecksIcon weight="bold" size="24px" />
        <FrostedHeading as="h2" size="4" weight="medium" className={styles.title}>
          Requires Immediate Attention!
        </FrostedHeading>
        <FrostedText size="2" className={styles.viewAll}>
          <FrostedLink href="#" underline="hover">
            View All
          </FrostedLink>
        </FrostedText>
      </div>
      {alerts.length > 0 ? (
        <RadixToastProvider>
          <Toast message={alerts[0].message} variant={alerts[0].variant} duration={0} />

          <RadixToastViewport />
        </RadixToastProvider>
      ) : (
        <FrostedText as="p">No alerts to review.</FrostedText>
      )}
    </div>
  );
};

export default ReviewAlerts;
export { type IReviewAlertsProps };
