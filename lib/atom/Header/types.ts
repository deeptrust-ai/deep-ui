export interface IHeaderProps {
  readonly title: string;
  readonly subtitle?: string;
  readonly metaInfo?: string;
  readonly headerAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}
