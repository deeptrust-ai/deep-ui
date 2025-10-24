import type { ReactNode } from 'react';

import { Text } from 'frosted-ui';
import cn from 'classnames';
import styles from './styles.module.css';

export const menuItemDefaults = {
  link: '#',
  subItem: false,
  selected: false,
  icon: null,
};

export interface IMenuItemProps {
  readonly label: string;
  readonly icon?: ReactNode;
  readonly link?: string;
  readonly selected?: boolean;
  readonly subItem?: boolean;
}

const MenuItem = ({
  label,
  icon = menuItemDefaults.icon,
  link = menuItemDefaults.link,
  selected = menuItemDefaults.selected,
  subItem = menuItemDefaults.subItem,
}: IMenuItemProps) => {
  const classNames = cn(styles.item, {
    [styles.subItem]: subItem,
    [styles.selected]: selected,
  });

  return (
    <>
      {/* {subItem && <div className={styles.subItemIndicator} />} */}

      <a href={link} className={classNames}>
        {icon}
        <Text>{label}</Text>
      </a>
    </>
  );
};
export default MenuItem;
