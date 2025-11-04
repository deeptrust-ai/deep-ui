import { ListChecksIcon } from '@phosphor-icons/react';
import { Link as FrostedLink, Text as FrostedText } from 'frosted-ui';
import Toast from '../../atom/Toast';
import type { IReviewAlertsProps } from './types';
import styles from './styles.module.css';

const ImmediateReview = ({ alerts }: IReviewAlertsProps) => {
  return (
    <div>
      <div className={styles.header}>
        <ListChecksIcon weight="bold" size="24px" />
        <FrostedText size="4" weight="medium" className={styles.title}>
          Requires Immediate Attention!
        </FrostedText>
        <FrostedText size="2" className={styles.viewAll}>
          <FrostedLink href="#" underline="hover">
            View All
          </FrostedLink>
        </FrostedText>
      </div>
      <Toast message={alerts[0].message} variant={alerts[0].variant} duration={0} />
    </div>
  );
};

export default ImmediateReview;
export { type IReviewAlertsProps };
