import type { ComponentProps } from 'react';
import { Tabs as RadixTabs } from '@radix-ui/themes';

/** Props forwarded to the Radix Tabs root element. */
export type IVerticalTabsRootProps = ComponentProps<typeof RadixTabs.Root>;
/** Props forwarded to the Radix Tabs list element. */
export type IVerticalTabsListProps = ComponentProps<typeof RadixTabs.List>;
/** Props forwarded to a Radix Tabs trigger element. */
export type IVerticalTabsTriggerProps = ComponentProps<typeof RadixTabs.Trigger>;
/** Props forwarded to a Radix Tabs content panel. */
export type IVerticalTabsContentProps = ComponentProps<typeof RadixTabs.Content>;

/** Props for the {@link VerticalTabs} molecule component (alias of root props). */
export type IVerticalTabsProps = IVerticalTabsRootProps;
