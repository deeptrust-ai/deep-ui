import type { SIZE_CONFIG } from './constants';

export type LogoVariantKey = 'wordmark' | 'icon' | 'full';
export type SizeKey = keyof typeof SIZE_CONFIG;

export interface ILogoProps {
  size?: SizeKey;
  variant?: LogoVariantKey;
}

export interface ILogoPartProps {
  width: number;
  height: number;
}
