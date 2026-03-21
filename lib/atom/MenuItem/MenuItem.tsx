import cn from 'classnames';
import { Link, Text } from '@radix-ui/themes';
import type { ElementType } from 'react';
import type { IMenuItemProps } from './MenuItem.types';
import styles from './MenuItem.module.css';

const MenuItem = <TAnchor extends ElementType = 'a'>({
  anchorComponent,
  anchorProps,
  label,
  icon: Icon,
  selected = false,
  subpage = false,
  heading = false,
  activeClassName = 'active',
}: IMenuItemProps<TAnchor>) => {
  const AnchorComponent = anchorComponent ?? 'a';
  const isActiveFromClassName = (anchorProps?.className?.split(/\s+/) ?? []).includes(
    activeClassName
  );
  const isActive = selected || isActiveFromClassName;
  const anchorClassName = cn(styles.anchor, anchorProps?.className, {
    [styles.heading]: heading,
    [styles.active]: !subpage && isActive,
  });
  const hasSelectedSubpage = isActive && subpage;

  return (
    <div
      className={cn(styles.item, {
        [styles.subItem]: subpage,
      })}
    >
      {subpage ? (
        <div
          className={cn(styles.subItemIndicator, {
            [styles.selectedSubItem]: hasSelectedSubpage,
          })}
        />
      ) : null}
      <Link asChild>
        <AnchorComponent {...anchorProps} className={anchorClassName}>
          {Icon ? <Icon size={20} /> : null}
          <Text size="3">{label}</Text>
        </AnchorComponent>
      </Link>
    </div>
  );
};

export default MenuItem;
export type { IMenuItemProps };
