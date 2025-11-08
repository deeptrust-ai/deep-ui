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
  subpage = menuItemDefaults.subpage,
}: IMenuItemProps) => {
  return (
    <div
      className={cn(styles.item, {
        [styles.subItem]: subpage,
      })}
    >
      {subpage && (
        <div
          className={cn(styles.subItemIndicator, {
            [styles.selectedSubItem]: subpage && selected,
          })}
        />
      )}

      <a
        href={link}
        className={cn(styles.anchor, {
          [styles.subItem]: subpage,
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
export type { IMenuItemProps };
