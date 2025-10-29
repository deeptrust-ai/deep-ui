import cn from 'classnames';
import Wordmark from './Wordmark';
import Icon from './Icon';
import type { ILogoProps } from './types';
import { SIZE_CONFIG, VARIANT_CONFIG } from './constants';
import styles from './styles.module.css';

const { icon: iconCfg, wordmark: wordCfg } = VARIANT_CONFIG;

const Logo = ({ variant = 'full', size = 'medium' }: ILogoProps) => {
  const isFullWidth = variant === 'full';
  const width = SIZE_CONFIG[size].baseWidth;

  const wordmarkWidth = width ?? wordCfg.baseWidth;
  const scale = wordmarkWidth / wordCfg.baseWidth;
  const wordmarkHeight = wordCfg.baseHeight * scale;

  const iconWidth = isFullWidth ? wordmarkHeight : iconCfg.baseWidth;
  const iconHeight = iconCfg.baseHeight * (iconWidth / iconCfg.baseWidth);

  return (
    <div className={cn(styles.logo, styles[size])}>
      {variant !== 'wordmark' && (
        <Icon width={iconWidth} height={iconHeight} {...VARIANT_CONFIG.icon} />
      )}
      {variant !== 'icon' && (
        <Wordmark width={wordmarkWidth} height={wordmarkHeight} {...VARIANT_CONFIG.wordmark} />
      )}
    </div>
  );
};

export default Logo;
