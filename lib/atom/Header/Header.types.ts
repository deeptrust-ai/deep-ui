import type { HeadingProps } from 'frosted-ui';

export interface IHeaderProps {
  readonly title: string;
  readonly subtitle?: string;
  readonly metaInfo?: string;
  readonly headerAs?: HeadingProps['as'];
  readonly headerSize?: HeadingProps['size'];
}
