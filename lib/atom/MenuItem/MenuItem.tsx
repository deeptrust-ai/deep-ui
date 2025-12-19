import type { ComponentPropsWithoutRef, ElementType } from 'react';
import { Link, Text } from '@radix-ui/themes';
import cn from 'classnames';
import styles from './MenuItem.module.css';
import type { IMenuItemProps } from './MenuItem.types';

/**
 * MenuItem component represents a single item in a menu, which can optionally be a subpage and can indicate selection state.
 */
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

  const selectedPage = !!selected || anchorProps?.className?.includes(activeClassName);

  const anchorClassName = cn(styles.anchor, anchorProps?.className, {
    [styles.heading]: !!heading,
    [styles.active]: !subpage && selectedPage,
  });
  const selectedSubItem = selectedPage && !!subpage;

  const combinedAnchorProps = {
    ...anchorProps,
    className: anchorClassName,
  } as ComponentPropsWithoutRef<TAnchor>;

  return (
    <div
      className={cn(styles.item, {
        [styles.subItem]: !!subpage,
      })}
    >
      {!!subpage && (
        <div
          className={cn(styles.subItemIndicator, {
            [styles.selectedSubItem]: selectedSubItem,
          })}
        />
      )}

      <Link asChild>
        <AnchorComponent {...combinedAnchorProps}>
          {Icon && <Icon size="20" />}
          <Text size="3">{label}</Text>
        </AnchorComponent>
      </Link>
    </div>
  );
};
export default MenuItem;
export type { IMenuItemProps };
