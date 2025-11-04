import { Avatar as FrostedAvatar, Text as FrostedText } from 'frosted-ui';
import type { IUserProps } from './types';
import styles from './styles.module.css';

const User = ({ name, position, pictureSrc }: IUserProps) => {
  return (
    <div className={styles.container}>
      <FrostedAvatar shape="square" fallback={name} src={pictureSrc} />
      <span>
        <FrostedText size="3">{name}</FrostedText>
        <FrostedText size="2">{position}</FrostedText>
      </span>
    </div>
  );
};

export default User;
export type { IUserProps };
