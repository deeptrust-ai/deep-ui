import { Button as FrostedButton, type ButtonProps } from 'frosted-ui';

import styles from './styles.module.css';

const Button = ({ className, ...restProps }: ButtonProps) => {
  return <FrostedButton className={`${className} ${styles.button}`} {...restProps} />;
}

export default Button;
export type { ButtonProps };
