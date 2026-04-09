import type { ComponentPropsWithoutRef, ElementType } from 'react';
import type { SIZE_CONFIG } from './constants';

/** Valid size presets for the logo, derived from {@link SIZE_CONFIG}. */
export type SizeKey = keyof typeof SIZE_CONFIG;

/** Anchor element props passed to the logo wrapper link. */
export type ILogoAnchorProps = Omit<ComponentPropsWithoutRef<'a'>, 'children'> & {
  readonly to?: string;
  readonly [key: string]: unknown;
};

/** Props for the {@link Logo} atom component. */
export interface ILogoProps {
  size?: SizeKey;
  href?: string | null;
  anchorComponent?: ElementType;
  anchorProps?: ILogoAnchorProps;
}

/** Dimension props passed to individual SVG parts of the logo. */
export interface ILogoPartProps {
  width: number;
  height: number;
}
