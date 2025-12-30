import type { ElementType } from 'react';
import MenuItem from '../../atom/MenuItem';
import type { IMenuProps } from './Menu.types';
import styles from './Menu.module.css';

/**
 * Menu component renders a navigation menu based on the provided pages.
 */
const Menu = <TAnchor extends ElementType = 'a'>({
  pages,
  anchorComponent,
}: IMenuProps<TAnchor>) => {
  return (
    <ul className={styles.menu}>
      {pages.map((page) => {
        const hasSelectedSubPage = page.subPages
          ? page.subPages.some((subPage) => {
              const classList = subPage.anchorProps?.className?.split(/\s+/) ?? [];
              return subPage.selected || classList.includes('active');
            })
          : false;

        return (
          <li key={page.label}>
            <MenuItem {...page} heading={hasSelectedSubPage} anchorComponent={anchorComponent} />
            {page.subPages && (
              <ul>
                {page.subPages.map((subPage) => (
                  <li key={subPage.label}>
                    <MenuItem {...subPage} subpage anchorComponent={anchorComponent} />
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Menu;
export type { IMenuProps } from './Menu.types';
