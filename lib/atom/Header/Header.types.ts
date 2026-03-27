import type { HeadingProps } from '@radix-ui/themes';

/** Props for the {@link Header} atom component. */
export interface IHeaderProps {
  readonly title: string;
  readonly subtitle?: string;
  readonly metaInfo?: string;
  readonly headerAs?: HeadingProps['as'];
  readonly headerSize?: HeadingProps['size'];
}
