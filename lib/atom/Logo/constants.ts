export const WORDMARK_OFFSET = 28;

export const VARIANT_CONFIG = {
  full: {},
  wordmark: {
    baseWidth: 130 - WORDMARK_OFFSET,
    baseHeight: 21,
    viewBoxMinX: WORDMARK_OFFSET,
  },
  icon: { baseWidth: 21, baseHeight: 21, viewBoxMinX: 0 },
} as const;
