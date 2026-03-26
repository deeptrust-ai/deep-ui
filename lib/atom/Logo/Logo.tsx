import cn from 'classnames';
import type { ILogoProps } from './types';
import { SIZE_CONFIG } from './constants';
import styles from './styles.module.css';
import { Box, Link } from '@radix-ui/themes';
import logoSrc from './logo.png';

export const Logo = ({ size = 'medium', href = '/' }: ILogoProps) => {
  const width = SIZE_CONFIG[size].baseWidth;
  const image = (
    <img src={logoSrc} alt={'DeepTrust.ai Logo'} width={width} style={{ display: 'block' }} />
  );

  return (
    <Box className={cn(styles.logo, styles[size])}>{href ? <Link href={href}>{image}</Link> : image}</Box>
  );
};

export default Logo;
export type { ILogoProps } from './types';
