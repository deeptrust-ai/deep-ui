import { Button as FrostedButton, type ButtonProps } from 'frosted-ui';
import cn from 'classnames';
import styles from './styles.module.css';

const Button = ({ className, ...restProps }: ButtonProps) => {
  const classNames = cn(styles.button, className);
  return <FrostedButton className={classNames} {...restProps} />;
};

export default Button;
export type { ButtonProps };
