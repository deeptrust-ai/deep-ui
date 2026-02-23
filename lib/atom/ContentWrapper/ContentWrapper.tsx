import { Box } from '@radix-ui/themes';
import cn from 'classnames';
import styles from './ContentWrapper.styles.module.css';
import type { IContentWrapperProps } from './ContentWrapper.types';
import Header from '../Header';

const ContentWrapper = ({
  children,
  title,
  subtitle,
  metaInfo,
  className,
  ...rest
}: IContentWrapperProps) => {
  return (
    <Box className={cn(styles.wrapper, className)} height="100%" {...rest}>
      {title && <Header title={title} subtitle={subtitle} metaInfo={metaInfo} />}
      <Box py="4" px="5" height="100%">
        {children}
      </Box>
    </Box>
  );
};

export default ContentWrapper;
