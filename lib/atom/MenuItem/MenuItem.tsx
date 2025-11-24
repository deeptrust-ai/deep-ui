import type { ComponentPropsWithoutRef, ElementType } from 'react';
import { Text } from 'frosted-ui';
import cn from 'classnames';
import styles from './styles.module.css';
import type { IMenuItemProps } from './types';

/**
 * MenuItem component represents a single item in a menu, which can optionally be a subpage and can indicate selection state.
 */
const MenuItem = <TAnchor extends ElementType = 'a'>({
  anchorComponent,
  anchorProps,
  label,
  icon: Icon,
  link,
  selected = false,
  subpage = false,
}: IMenuItemProps<TAnchor>) => {
  const AnchorComponent = anchorComponent ?? 'a';
  const anchorClassName = cn(styles.anchor, anchorProps?.className, {
    [styles.subItem]: !!subpage,
    [styles.selected]: !!selected,
  });

  const href = AnchorComponent === 'a' ? (anchorProps?.href ?? link) : undefined;

  const combinedAnchorProps = {
    ...anchorProps,
    className: anchorClassName,
    ...(href ? { href } : {}),
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
            [styles.selectedSubItem]: !!subpage && !!selected,
          })}
        />
      )}

      <AnchorComponent {...combinedAnchorProps}>
        {Icon && <Icon size="20" />}
        <Text size="3">{label}</Text>
      </AnchorComponent>
    </div>
  );
};
export default MenuItem;
export type { IMenuItemProps };
