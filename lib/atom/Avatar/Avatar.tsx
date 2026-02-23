import { Avatar as RadixAvatar } from '@radix-ui/themes';
import type { IAvatarProps } from './types';
import styles from './Avatar.module.css';

const Avatar = ({ name, pfp, size = '3' }: IAvatarProps) => {
  const fallback = name ? name.charAt(0).toUpperCase() : undefined;

  return (
    <RadixAvatar
      radius="full"
      color="blue"
      size={size}
      fallback={<>{fallback}</>}
      src={pfp}
      alt={pfp ? `${name}'s Avatar` : undefined}
      className={styles.avatar}
    />
  );
};

export default Avatar;
export type { IAvatarProps };
