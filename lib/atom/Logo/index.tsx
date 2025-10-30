import cn from 'classnames';
import Wordmark from './Wordmark';
import Icon from './Icon';
import type { ILogoProps } from './types';
import { SIZE_CONFIG, WORDMARK_CONFIG } from './constants';
import styles from './styles.module.css';

const Logo = ({ variant = 'full', size = 'medium' }: ILogoProps) => {
  const width = SIZE_CONFIG[size].baseWidth;

  const wordmarkWidth = width ?? WORDMARK_CONFIG.baseWidth;
  const scale = wordmarkWidth / WORDMARK_CONFIG.baseWidth;
  const wordmarkHeight = WORDMARK_CONFIG.baseHeight * scale;

  const iconWidth = wordmarkHeight;
  const iconHeight = wordmarkHeight;

  return (
    <div className={cn(styles.logo, styles[size])}>
      {variant !== 'wordmark' && <Icon width={iconWidth} height={iconHeight} />}
      {variant !== 'icon' && <Wordmark width={wordmarkWidth} height={wordmarkHeight} />}
    </div>
  );
};

export default Logo;
