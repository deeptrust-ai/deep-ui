import Logo from '../../atom/Logo';
import Menu from '../../molecule/Menu';
import styles from './styles.module.css';
import type { ISidebarMenu } from './types';

const Sidebar = ({ menuPages }: ISidebarMenu) => {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <Menu pages={menuPages} />
    </div>
  );
};

export default Sidebar;
