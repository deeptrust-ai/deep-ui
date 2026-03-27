import type { FlexProps } from '@radix-ui/themes';
import type { ReactNode } from 'react';

/** Props for the {@link ContentWrapper} atom component. */
export type IContentWrapperProps = FlexProps & {
  title?: string;
  subtitle?: string;
  metaInfo?: string;
  children: ReactNode;
};
