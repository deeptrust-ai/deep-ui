import type { SIZE_CONFIG } from './constants';

/** Valid size presets for the logo, derived from {@link SIZE_CONFIG}. */
export type SizeKey = keyof typeof SIZE_CONFIG;

/** Props for the {@link Logo} atom component. */
export interface ILogoProps {
  size?: SizeKey;
  href?: string | null;
}

/** Dimension props passed to individual SVG parts of the logo. */
export interface ILogoPartProps {
  width: number;
  height: number;
}
