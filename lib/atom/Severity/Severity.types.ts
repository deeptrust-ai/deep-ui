// NOTE: Don't allow both to be true at the same time
type SeverityDisplayMode =
  | { readonly iconOnly?: true; readonly textOnly?: false | undefined }
  | { readonly textOnly?: true; readonly iconOnly?: false | undefined }
  | { readonly iconOnly?: false | undefined; readonly textOnly?: false | undefined };

export type ISeverityProps = SeverityDisplayMode & {
  readonly level: 'critical' | 'high' | 'medium' | 'low' | 'info' | 'success';
};
