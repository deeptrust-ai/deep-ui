import type { VARIANT_CONFIG } from './constants';

export type LogoVariantKey = keyof typeof VARIANT_CONFIG;

export interface ILogoProps {
  width?: number;
  variant?: LogoVariantKey;
}

export interface LogoGraphicProps {
  baseWidth: number;
  baseHeight: number;
  viewBoxMinX: number;
  width?: number;
}
