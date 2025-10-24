import { Button as FrostedButton, type ButtonProps as FrostButtonProps } from 'frosted-ui';
import cn from 'classnames';
import styles from './styles.module.css';


export const buttonColors = ['gray', 'danger', 'warning', 'success', 'info', 'violet', 'green', 'blue', 'orange', 'red', 'yellow'] as const;
type ButtonProps = Omit<FrostButtonProps, 'color'> & {
  color?: typeof buttonColors[number];
};

const Button = ({ className, ...restProps }: ButtonProps) => {
  const classNames = cn(styles.button, className);
  return <FrostedButton className={classNames} {...restProps} />;
};

export default Button;
export type { ButtonProps };
