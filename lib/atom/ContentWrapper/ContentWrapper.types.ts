import type { BoxProps } from '@radix-ui/themes';
import type { ReactNode } from 'react';

export type IContentWrapperProps = BoxProps & {
  title?: string;
  subtitle?: string;
  metaInfo?: string;
  children: ReactNode;
};
