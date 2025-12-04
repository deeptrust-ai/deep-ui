import { Box, Container } from '@radix-ui/themes';
import { Heading } from 'frosted-ui';
import styles from './ContentWrapper.styles.module.css';
import type { IContentWrapperProps } from './ContentWrapper.types';
import Header from '../Header';

const ContentWrapper = ({ children, title, subtitle, metaInfo, sidebar }: IContentWrapperProps) => {
  return (
    <Container className={styles.wrapper}>
      {sidebar ? (
        <Heading as="h3" weight="bold" size="3">
          {title}
        </Heading>
      ) : (
        <Header title={title} subtitle={subtitle} metaInfo={metaInfo} />
      )}
      <Box py="4" px="5">
        {children}
      </Box>
    </Container>
  );
};

export default ContentWrapper;
