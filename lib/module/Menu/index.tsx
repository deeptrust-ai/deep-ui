import MenuItem from '../../atom/MenuItem';
import type { IMenuProps } from './types';

const Menu = ({ pages }: IMenuProps) => {
  return (
    <div>
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
    </div>
  );
};

export default Menu;
