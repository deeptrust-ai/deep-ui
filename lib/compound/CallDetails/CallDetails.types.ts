import type { ComponentProps, ReactNode } from 'react';
import { Badge as RadixBadge } from '@radix-ui/themes';

export interface ICallDetailsMetaItem {
  label: string;
  value: ReactNode;
}

export interface ICallDetailsProps {
  title: string;
  subtitle?: string;
  summary?: ReactNode;
  actions?: ReactNode;
  primaryContent: ReactNode;
  secondaryContent?: ReactNode;
  metaItems?: ICallDetailsMetaItem[];
  statusBadgeLabel?: string;
  statusBadgeColor?: ComponentProps<typeof RadixBadge>['color'];
  className?: string;
}
