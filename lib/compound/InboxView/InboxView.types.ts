export type InboxViewTabs = {
  label: string;
  value: string;
  content: React.ReactNode;
};

export interface IInboxViewProps {
  tabs: Array<InboxViewTabs>;
}
