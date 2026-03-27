/** A single entry in the inbox call list sidebar. */
export type CallListItem = {
  id: string;
  label: React.ReactNode | string;
  startTime: string;
  severity: string;
  onClick: () => void;
  active: boolean;
  read: boolean;
};

/** Props for the {@link InboxView} compound component. */
export interface IInboxViewProps {
  content: React.ReactNode;
  callList: Array<CallListItem>;
}
