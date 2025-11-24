import { Avatar } from '../../atom';
import { Breadcrumbs } from '../../molecule';
import styles from './styles.module.css';
import type { ITopbarProps } from './types';

const Topbar = ({ breadcrumbs, organizations, userName, userPfp }: ITopbarProps) => {
  return (
    <div className={styles.topbar}>
      <Breadcrumbs organizations={organizations} crumbs={breadcrumbs} />
      <Avatar name={userName} pfp={userPfp} />
    </div>
  );
};

export default Topbar;
