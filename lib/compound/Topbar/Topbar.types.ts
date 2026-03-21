import type { Icon } from '@phosphor-icons/react';
import type { IAvatarProps } from '../../atom/Avatar/types';
import type {
  BreadcrumbEntity,
  BreadcrumbPage,
} from '../../molecule/Breadcrumbs';

type ItemAction = () => void | Promise<void>;

type LinkOrAction<TLinkKey extends string, TActionKey extends string> =
  | ({
      readonly [Key in TLinkKey]: string;
    } & {
      readonly [Key in TActionKey]?: never;
    })
  | ({
      readonly [Key in TLinkKey]?: never;
    } & {
      readonly [Key in TActionKey]: ItemAction;
    });

export interface ITopbarLink {
  readonly anchorProps: {
    readonly href?: string;
    readonly to?: string;
    readonly 'aria-current'?: 'page';
  };
  readonly icon?: Icon;
  readonly label: string;
  readonly selected?: boolean;
}

export type ITopbarMenuItem = LinkOrAction<'href', 'onClick'> & {
  readonly label: string;
  readonly shortcut?: string;
  readonly icon?: Icon;
};

export type ITopbarLogoutAction = LinkOrAction<'href', 'onClick'> & {
  readonly label?: string;
};

export interface ITopbarProps {
  readonly organizations: BreadcrumbEntity[];
  readonly workspaces?: BreadcrumbEntity[];
  readonly pages?: BreadcrumbPage[];
  readonly selectedOrganizationId?: string;
  readonly selectedWorkspaceIds?: string[];
  readonly onWorkspaceSelectionChange?: (workspaceIds: string[]) => void;
  readonly links?: ITopbarLink[];
  readonly userName: IAvatarProps['name'];
  readonly userPfp?: IAvatarProps['pfp'];
  readonly userMenuItems?: ITopbarMenuItem[];
  readonly logout?: ITopbarLogoutAction;
}
