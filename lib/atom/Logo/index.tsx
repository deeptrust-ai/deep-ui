import Wordmark from './Wordmark';
import Icon from './Icon';
import type { ILogoProps } from './types';
import { VARIANT_CONFIG } from './constants';
import styles from './styles.module.css';

const Logo = ({ variant = 'full', width }: ILogoProps) => {
  return (
    <div className={styles.logo}>
      {variant !== 'wordmark' && <Icon width={width} {...VARIANT_CONFIG.icon} />}
      {variant !== 'icon' && <Wordmark width={width} {...VARIANT_CONFIG.wordmark} />}
    </div>
  );
};

export default Logo;
