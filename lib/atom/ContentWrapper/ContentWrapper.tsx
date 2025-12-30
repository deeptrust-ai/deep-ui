import { Box } from '@radix-ui/themes';
import styles from './ContentWrapper.styles.module.css';
import type { IContentWrapperProps } from './ContentWrapper.types';
import Header from '../Header';

const ContentWrapper = ({ children, title, subtitle, metaInfo, ...rest }: IContentWrapperProps) => {
  return (
    <Box className={styles.wrapper} height="100%" {...rest}>
      {title && <Header title={title} subtitle={subtitle} metaInfo={metaInfo} />}
      <Box py="4" px="5">
        {children}
      </Box>
    </Box>
  );
};

export default ContentWrapper;
