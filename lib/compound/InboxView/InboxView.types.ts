export type CallListItem = {
  id: string;
  label: React.ReactNode | string;
  startTime: string;
  severity: string;
  onClick: () => void;
  active: boolean;
  read: boolean;
};

export interface IInboxViewProps {
  content: React.ReactNode;
  callList: Array<CallListItem>;
}
