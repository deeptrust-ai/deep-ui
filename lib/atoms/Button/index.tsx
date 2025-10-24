import { Button as FrostedButton } from 'frosted-ui';
import cn from 'classnames';
import styles from './styles.module.css';
import { type ButtonProps } from './types';

const Button = ({ className, ...restProps }: ButtonProps) => {
  const classNames = cn(styles.button, className);
  return <FrostedButton className={classNames} {...restProps} />;
};

export default Button;
