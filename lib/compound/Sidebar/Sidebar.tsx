import Logo from '../../atom/Logo';
import Menu from '../../molecule/Menu';
import styles from './styles.module.css';
import type { ISidebarMenu } from './types';

/**
 * Sidebar component that includes a Logo and a Menu.
 */
export const Sidebar = ({ menuPages }: ISidebarMenu) => {
  return (
    <div className={styles.sidebar}>
      <Logo />
      {menuPages && <Menu pages={menuPages} />}
    </div>
  );
};

export default Sidebar;
