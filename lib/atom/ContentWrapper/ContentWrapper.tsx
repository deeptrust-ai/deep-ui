import { Box, Flex } from '@radix-ui/themes';
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
    <Flex className={cn(styles.wrapper, className)} mb="2" flexGrow="1" direction="column" {...rest}>
      {title && <Header title={title} subtitle={subtitle} metaInfo={metaInfo} />}
      <Box py="4" px="5" flexGrow="1">
        {children}
      </Box>
    </Flex>
  );
};

export default ContentWrapper;
