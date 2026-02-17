import type { AvatarProps } from '@radix-ui/themes';

export interface IAvatarProps {
  name: string;
  pfp?: string;
  size?: AvatarProps['size'];
}
