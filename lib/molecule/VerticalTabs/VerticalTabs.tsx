import { Tabs as RadixTabs } from '@radix-ui/themes';
import classNames from 'classnames';
import type {
  IVerticalTabsContentProps,
  IVerticalTabsListProps,
  IVerticalTabsProps,
  IVerticalTabsRootProps,
  IVerticalTabsTriggerProps,
} from './VerticalTabs.types';
import styles from './VerticalTabs.module.css';

const Root = ({ className, ...props }: IVerticalTabsRootProps) => {
  return <RadixTabs.Root className={classNames(styles.root, className)} {...props} />;
};

const List = ({ className, ...props }: IVerticalTabsListProps) => {
  return <RadixTabs.List className={classNames(styles.list, className)} {...props} />;
};

const Trigger = ({ className, ...props }: IVerticalTabsTriggerProps) => {
  return <RadixTabs.Trigger className={classNames(styles.trigger, className)} {...props} />;
};

const Content = ({ className, ...props }: IVerticalTabsContentProps) => {
  return <RadixTabs.Content className={classNames(styles.content, className)} {...props} />;
};

const VerticalTabs = {
  Root,
  List,
  Trigger,
  Content,
};

export default VerticalTabs;
export type {
  IVerticalTabsProps,
  IVerticalTabsRootProps,
  IVerticalTabsListProps,
  IVerticalTabsTriggerProps,
  IVerticalTabsContentProps,
};
