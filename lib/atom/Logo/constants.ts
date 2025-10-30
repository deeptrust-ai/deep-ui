export const LOGO_BASE_WIDTH = 130;
export const LOGO_BASE_HEIGHT = 21;
export const WORDMARK_OFFSET = 28.6494;
export const ICON_BASE_WIDTH = 21.6856;

export const SIZE_CONFIG = {
  small: {
    baseWidth: 45,
  },
  medium: {
    baseWidth: 130,
  },
  large: {
    baseWidth: 260,
  },
} as const;

export const WORDMARK_CONFIG = {
  baseWidth: LOGO_BASE_WIDTH - WORDMARK_OFFSET,
  baseHeight: LOGO_BASE_HEIGHT,
} as const;
