import { Text } from 'frosted-ui';
import cn from 'classnames';
import styles from './styles.module.css';
import type { IMenuItemProps } from './types';
import { menuItemDefaults } from './constants';

/**
 * MenuItem component represents a single item in a menu, which can optionally be a subpage and can indicate selection state.
 */
const MenuItem = ({
  label,
  icon: Icon,
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
        {Icon && <Icon size="20" />}
        <Text size="3">{label}</Text>
      </a>
    </div>
  );
};
export default MenuItem;
export type { IMenuItemProps };
