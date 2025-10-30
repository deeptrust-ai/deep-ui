import { Avatar } from '../../atom';
import { Breadcrumbs } from '../../molecule';
import styles from './styles.module.css';
import type { IHeaderProps } from './types';

const Header = ({ organizations, userName, userPfp }: IHeaderProps) => {
  return (
    <div className={styles.header}>
      <Breadcrumbs organizations={organizations} />
      <Avatar name={userName} pfp={userPfp} />
    </div>
  );
};

export default Header;
