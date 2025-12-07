import MenuItem from '../../atom/MenuItem';
import type { ElementType } from 'react';
import type { IMenuProps } from './types';
import styles from './styles.module.css';

/**
 * Menu component renders a navigation menu based on the provided pages.
 */
const Menu = <TAnchor extends ElementType = 'a'>({
  pages,
  anchorComponent,
}: IMenuProps<TAnchor>) => {
  return (
    <nav className={styles.menu}>
      <ul>
        {pages.map((page) => (
          <li key={page.label}>
            <MenuItem
              {...page}
              heading={page.subPages && page.subPages?.length > 0}
              anchorComponent={anchorComponent}
            />
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
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
export type { IMenuProps } from './types';
