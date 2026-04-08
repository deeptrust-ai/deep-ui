import { ListChecksIcon } from '@phosphor-icons/react';
import { Flex, Link as RadixLink, Text as RadixText, Heading as RadixHeading } from '@radix-ui/themes';
import Callout from '../../atom/Callout';
import type { IReviewAlertsProps } from './types';
import styles from './styles.module.css';

const ReviewAlerts = ({ alerts }: IReviewAlertsProps) => {
  return (
    <div>
      <Flex gap="2" align="center" mb="2">
        <ListChecksIcon weight="bold" size={20} />
        <RadixHeading as="h2" size="4" weight="medium" className={styles.title}>
          Requires Immediate Attention!
        </RadixHeading>
        <RadixText size="2" className={styles.viewAll}>
          <RadixLink href="#" underline="hover">
            View All
          </RadixLink>
        </RadixText>
      </Flex>
      {alerts.length > 0 ? (
        <Callout message={alerts[0].message} variant={alerts[0].variant} />
      ) : (
        <RadixText as="p">No alerts to review.</RadixText>
      )}
    </div>
  );
};

export default ReviewAlerts;
export { type IReviewAlertsProps };
