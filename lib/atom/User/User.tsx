import { Avatar as RadixAvatar, Text as RadixText } from '@radix-ui/themes';
import type { IUserProps } from './User.types';
import styles from './User.module.css';

export const User = ({ name, position, pictureSrc }: IUserProps) => {
  return (
    <div className={styles.container}>
      <RadixAvatar
        radius="medium"
        fallback={name}
        src={pictureSrc}
        alt={pictureSrc ? `${name}'s Avatar` : undefined}
      />
      <div>
        <RadixText size="3">{name}</RadixText>
        <RadixText size="2" color="gray">
          {position}
        </RadixText>
      </div>
    </div>
  );
};

export default User;
export type { IUserProps };
