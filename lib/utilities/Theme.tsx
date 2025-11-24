import React from 'react';
import { Theme as FrostedTheme } from 'frosted-ui';
import '../styles.css';

type FrostedThemeProps = React.ComponentProps<typeof FrostedTheme>;

const defaultThemeProps: Partial<FrostedThemeProps> = {
  appearance: 'light',
  accentColor: 'crimson',
  grayColor: 'gray',
  dangerColor: 'red',
  successColor: 'green',
  warningColor: 'yellow',
  infoColor: 'blue',
};

export const Theme: React.FC<FrostedThemeProps> = ({ children, style, ...rest }) => {
  const merged = { ...defaultThemeProps, ...rest } as FrostedThemeProps;
  // If caller passes a style prop, allow it to override or extend any defaults.
  if (style) merged.style = { ...(merged.style as React.CSSProperties | undefined), ...style };

  return <FrostedTheme {...merged}>{children}</FrostedTheme>;
};

export default Theme;
