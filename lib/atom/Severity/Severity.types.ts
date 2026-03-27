/** Display mode for the severity indicator — icon-only, text-only, or both (mutually exclusive). */
type SeverityDisplayMode =
  | { readonly iconOnly?: true; readonly textOnly?: false | undefined }
  | { readonly textOnly?: true; readonly iconOnly?: false | undefined }
  | { readonly iconOnly?: false | undefined; readonly textOnly?: false | undefined };

/** Props for the {@link Severity} atom component. */
export type ISeverityProps = SeverityDisplayMode & {
  readonly level: 'critical' | 'high' | 'medium' | 'low' | 'info' | 'success';
};
