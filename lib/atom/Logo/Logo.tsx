import cn from 'classnames';
import type { ILogoProps } from './types';
import { SIZE_CONFIG } from './constants';
import styles from './styles.module.css';
import { Box, Link } from '@radix-ui/themes';
import logoSrc from './logo.png';

export const Logo = ({ size = 'medium' }: ILogoProps) => {
  const width = SIZE_CONFIG[size].baseWidth;

  return (
    <Box className={cn(styles.logo, styles[size])} asChild>
      <Link href="/">
        <img src={logoSrc} alt={'DeepTrust.ai Logo'} width={width} />
      </Link>
    </Box>
  );
};

export default Logo;
export type { ILogoProps } from './types';
