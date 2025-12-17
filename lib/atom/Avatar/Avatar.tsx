import { Avatar as RadixAvatar } from '@radix-ui/themes';
import type { IAvatarProps } from './types';

const Avatar = ({ name, pfp }: IAvatarProps) => {
  return (
    <RadixAvatar
      // shape="circle"
      color="blue"
      size="3"
      fallback={name}
      src={pfp}
      alt={pfp ? `${name}'s Avatar` : undefined}
    />
  );
};

export default Avatar;
export type { IAvatarProps };
