// Re-export all Radix Themes components as a pass-through so consumers only
// need to depend on @deeptrust-ai/deep-ui instead of importing Radix directly.
export * from '@radix-ui/themes';

// Deep-ui's own components.  For names that collide with Radix (Avatar, Badge,
// Callout, Table) the `export *` re-exports become ambiguous and are dropped by
// the module system – the explicit named exports below resolve the ambiguity in
// favour of deep-ui's versions.
export * from './atom';
export * from './molecule';
export * from './compound';
export * from './layout';

// ── Conflict resolution ────────────────────────────────────────────────
// These names exist in both @radix-ui/themes and deep-ui.  The explicit exports
// ensure the deep-ui versions win.
export { default as Avatar, type IAvatarProps } from './atom/Avatar';
export { default as Badge, type IBadgeProps } from './atom/Badge';
export { default as Callout, type ICalloutProps } from './atom/Callout';
export { default as Table, type ITableProps } from './compound/Table';

// Also expose the original Radix primitives under prefixed names so consumers
// that need the raw Radix component can still reach it through deep-ui.
export {
  Avatar as RadixAvatar,
  Badge as RadixBadge,
  Callout as RadixCallout,
  Table as RadixTable,
} from '@radix-ui/themes';
