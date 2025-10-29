export const LOGO_BASE_WIDTH = 130;
export const WORDMARK_OFFSET = 28.6494;
export const ICON_BASE_WIDTH = 21.6856;
export const ICON_BASE_HEIGHT = 21;

export const VARIANT_CONFIG = {
  full: {},
  wordmark: {
    baseWidth: LOGO_BASE_WIDTH - WORDMARK_OFFSET,
    baseHeight: ICON_BASE_HEIGHT,
    viewBoxMinX: WORDMARK_OFFSET,
  },
  icon: { baseWidth: ICON_BASE_WIDTH, baseHeight: ICON_BASE_HEIGHT, viewBoxMinX: 0 },
} as const;
