import type { SIZE_CONFIG } from './constants';

export type SizeKey = keyof typeof SIZE_CONFIG;

export interface ILogoProps {
  size?: SizeKey;
  href?: string | null;
}

export interface ILogoPartProps {
  width: number;
  height: number;
}
