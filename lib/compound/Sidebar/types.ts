export interface ISidebarMenu {
  readonly menuPages: {
    label: string;
    link: string;
    icon?: React.ReactNode;
    selected?: boolean;
    subPages?: ISubPage[];
  }[];
}
