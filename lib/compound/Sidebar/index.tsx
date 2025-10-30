import { AcornIcon } from '@phosphor-icons/react';
import Logo from '../../atom/Logo';
import Menu from '../../molecule/Menu';
import styles from './styles.module.css';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <Menu
        pages={[
          { label: 'Home', link: '/', icon: <AcornIcon />, selected: false },
          { label: 'About', link: '/about', icon: <AcornIcon />, selected: false },
          {
            label: 'Services',
            link: '/services',
            icon: <AcornIcon />,
            subPages: [
              { label: 'Consulting', link: '/services/consulting', selected: false },
              { label: 'Development', link: '/services/development', selected: false },
            ],
          },
          { label: 'Contact', link: '/contact', icon: <AcornIcon />, selected: false },
        ]}
      />
    </div>
  );
};

export default Sidebar;
