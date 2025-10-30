import { Avatar } from '../../atom';
import { Breadcrumbs } from '../../molecule';
import styles from './styles.module.css';

const Header = () => {
  return (
    <div className={styles.header}>
      <Breadcrumbs
        organizations={[
          { name: 'Acme, Inc', isTrial: true, selected: true },
          { name: 'Monsters Inc', isTrial: true },
          { name: 'Stark Industries', isTrial: false },
        ]}
      />

      <Avatar name="Darth Vader" />
    </div>
  );
};

export default Header;
