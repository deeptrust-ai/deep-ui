import type { AvatarProps } from '@radix-ui/themes';

/** Props for the {@link Avatar} atom component. */
export interface IAvatarProps {
  name: string;
  pfp?: string;
  size?: AvatarProps['size'];
}
