import React from 'react';
import { Theme as RadixTheme } from '@radix-ui/themes';

type RadixThemeProps = React.ComponentProps<typeof RadixTheme>;

const defaultThemeProps: Partial<RadixThemeProps> = {
  appearance: 'light',
  accentColor: 'crimson',
  grayColor: 'gray',
  // dangerColor: 'red',
  // successColor: 'green',
  // warningColor: 'yellow',
  // infoColor: 'blue',
};

export const Theme: React.FC<RadixThemeProps> = ({ children, style, ...rest }) => {
  const merged = { ...defaultThemeProps, ...rest } as RadixThemeProps;
  // If caller passes a style prop, allow it to override or extend any defaults.
  if (style) merged.style = { ...(merged.style as React.CSSProperties | undefined), ...style };

  return <RadixTheme {...merged}>{children}</RadixTheme>;
};

export default Theme;
