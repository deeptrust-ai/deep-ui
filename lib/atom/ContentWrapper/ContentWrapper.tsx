import { Box, Flex } from '@radix-ui/themes';
import { Heading } from 'frosted-ui';
import styles from './ContentWrapper.styles.module.css';
import type { IContentWrapperProps } from './ContentWrapper.types';
import Header from '../Header';

const ContentWrapper = ({
  children,
  title,
  subtitle,
  metaInfo,
  sidebar,
  onClose,
  onExpand,
}: IContentWrapperProps) => {
  return (
    <Box className={styles.wrapper} height="100%">
      {sidebar ? (
        <Flex direction="row" justify="between" px="5" pt="4">
          <Heading as="h3" weight="bold" size="4">
            {title}
          </Heading>
          {onExpand && <button onClick={onExpand}>Expand</button>}
          {onClose && <button onClick={onClose}>Close</button>}
        </Flex>
      ) : (
        <Header title={title} subtitle={subtitle} metaInfo={metaInfo} />
      )}
      <Box py="4" px="5">
        {children}
      </Box>
    </Box>
  );
};

export default ContentWrapper;
