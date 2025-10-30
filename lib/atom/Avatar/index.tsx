import { Avatar as FrostedAvatar } from 'frosted-ui';
import type { IAvatarProps } from './types';

const Avatar = ({ name, pfp }: IAvatarProps) => {
  return <FrostedAvatar shape="circle" color="blue" size="3" fallback={name} src={pfp} />;
};

export default Avatar;
export type { IAvatarProps };
