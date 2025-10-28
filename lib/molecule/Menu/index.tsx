import MenuItem from '../../atom/MenuItem';
import type { IMenuProps } from './types';
import styles from './styles.module.css';

const Menu = ({ pages }: IMenuProps) => {
  return (
    <nav className={styles.menu}>
      <ul>
        {pages.map((page) => (
          <li key={page.label}>
            <MenuItem {...page} />
            {page.subPages && (
              <ul>
                {page.subPages.map((subPage) => (
                  <li key={subPage.label}>
                    <MenuItem {...subPage} subItem />
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
