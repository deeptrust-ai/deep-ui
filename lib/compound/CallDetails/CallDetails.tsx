import { Badge, Box, Flex, Heading, Text } from '@radix-ui/themes';
import classNames from 'classnames';
import ContentWrapper from '../../atom/ContentWrapper';
import type { ICallDetailsProps } from './CallDetails.types';
import styles from './CallDetails.module.css';

const CallDetails = ({
  title,
  subtitle,
  summary,
  actions,
  primaryContent,
  secondaryContent,
  metaItems = [],
  statusBadgeLabel,
  statusBadgeColor = 'gray',
  className,
}: ICallDetailsProps) => {
  return (
    <ContentWrapper className={classNames(styles.wrapper, className)}>
      <Flex direction="column" gap="5">
        <div className={styles.header}>
          <div className={styles.titleBlock}>
            <div className={styles.titleRow}>
              <Heading as="h3" size="7">
                {title}
              </Heading>
              {statusBadgeLabel ? (
                <Badge color={statusBadgeColor} radius="full" variant="soft">
                  {statusBadgeLabel}
                </Badge>
              ) : null}
            </div>
            {subtitle ? (
              <Text as="p" color="gray" size="3">
                {subtitle}
              </Text>
            ) : null}
          </div>
          {actions ? <div className={styles.actions}>{actions}</div> : null}
        </div>

        {summary || metaItems.length ? (
          <div className={styles.overviewGrid}>
            <Box className={styles.overviewCard}>
              {typeof summary === 'string' ? (
                <Text as="p" size="3">
                  {summary}
                </Text>
              ) : (
                summary
              )}
            </Box>
            {metaItems.length ? (
              <Box className={styles.overviewCard}>
                <div className={styles.metaGrid}>
                  {metaItems.map((item) => (
                    <div key={item.label} className={styles.metaItem}>
                      <Text as="p" className={styles.metaLabel}>
                        {item.label}
                      </Text>
                      {typeof item.value === 'string' ? (
                        <Text as="p" size="3">
                          {item.value}
                        </Text>
                      ) : (
                        item.value
                      )}
                    </div>
                  ))}
                </div>
              </Box>
            ) : null}
          </div>
        ) : null}

        <div
          className={classNames(
            styles.body,
            secondaryContent ? styles.twoColumn : styles.singleColumn
          )}
        >
          <div className={styles.pane}>
            <div className={styles.panel}>{primaryContent}</div>
          </div>
          {secondaryContent ? (
            <div className={styles.pane}>
              <div className={styles.panel}>{secondaryContent}</div>
            </div>
          ) : null}
        </div>
      </Flex>
    </ContentWrapper>
  );
};

export default CallDetails;
export type { ICallDetailsMetaItem, ICallDetailsProps } from './CallDetails.types';
