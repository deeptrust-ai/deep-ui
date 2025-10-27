import { Text } from 'frosted-ui';
import cn from 'classnames';
import styles from './styles.module.css';
import type { IMenuItemProps } from './types';
import { menuItemDefaults } from './constants';

const MenuItem = ({
  label,
  icon = menuItemDefaults.icon,
  link = menuItemDefaults.link,
  selected = menuItemDefaults.selected,
  subItem = menuItemDefaults.subItem,
}: IMenuItemProps) => {
  return (
    <div
      className={cn(styles.item, {
        [styles.subItem]: subItem,
      })}
    >
      {subItem && (
        <div
          className={cn(styles.subItemIndicator, { [styles.selectedSubItem]: subItem && selected })}
        />
      )}

      <a
        href={link}
        className={cn(styles.anchor, {
          [styles.subItem]: subItem,
          [styles.selected]: selected,
        })}
      >
        {icon}
        <Text size="3">{label}</Text>
      </a>
    </div>
  );
};
export default MenuItem;
