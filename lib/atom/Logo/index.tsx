import cn from 'classnames';
import Wordmark from './Wordmark';
import Icon from './Icon';
import type { ILogoProps } from './types';
import { SIZE_CONFIG, WORDMARK_CONFIG } from './constants';
import styles from './styles.module.css';

const Logo = ({ variant = 'full', size = 'medium' }: ILogoProps) => {
  const width = SIZE_CONFIG[size].baseWidth;

  const scale = width / WORDMARK_CONFIG.baseWidth;
  const wordmarkHeight = WORDMARK_CONFIG.baseHeight * scale;

  return (
    <div className={cn(styles.logo, styles[size])}>
      {variant !== 'wordmark' && <Icon width={wordmarkHeight} height={wordmarkHeight} />}
      {variant !== 'icon' && <Wordmark width={width} height={wordmarkHeight} />}
    </div>
  );
};

export default Logo;
