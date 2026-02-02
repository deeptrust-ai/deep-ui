import type { ComponentProps } from 'react';
import { Tabs as RadixTabs } from '@radix-ui/themes';

export type IVerticalTabsRootProps = ComponentProps<typeof RadixTabs.Root>;
export type IVerticalTabsListProps = ComponentProps<typeof RadixTabs.List>;
export type IVerticalTabsTriggerProps = ComponentProps<typeof RadixTabs.Trigger>;
export type IVerticalTabsContentProps = ComponentProps<typeof RadixTabs.Content>;

export type IVerticalTabsProps = IVerticalTabsRootProps;
