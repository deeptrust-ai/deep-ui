import type { SIZE_CONFIG, VARIANT_CONFIG } from './constants';

export type LogoVariantKey = keyof typeof VARIANT_CONFIG | 'full';
export type SizeKey = keyof typeof SIZE_CONFIG;

export interface ILogoProps {
  size?: SizeKey;
  variant?: LogoVariantKey;
}

export interface LogoGraphicProps {
  baseWidth: number;
  baseHeight: number;
  viewBoxMinX: number;
  width?: number;
  height?: number;
}
