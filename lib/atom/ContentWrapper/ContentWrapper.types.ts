import type { FlexProps } from '@radix-ui/themes';
import type { ReactNode } from 'react';

export type IContentWrapperProps = FlexProps & {
  title?: string;
  subtitle?: string;
  metaInfo?: string;
  children: ReactNode;
};
