import type { Icon } from '@phosphor-icons/react';
import type { ComponentPropsWithoutRef, ElementType } from 'react';
import type { IAvatarProps } from '../../atom/Avatar/types';
import type { BreadcrumbEntity, BreadcrumbPage } from '../../molecule/Breadcrumbs';

type ItemAction = () => void | Promise<void>;

export type ITopbarLinkAnchorProps = Omit<ComponentPropsWithoutRef<'a'>, 'children'> & {
  readonly to?: string;
  readonly [key: string]: unknown;
};

export interface ITopbarLink {
  readonly anchorComponent?: ElementType;
  readonly anchorProps?: ITopbarLinkAnchorProps;
  readonly icon?: Icon;
  readonly label: string;
  readonly selected?: boolean;
  readonly activeClassName?: string;
}

type MenuItemBase = {
  readonly label: string;
  readonly shortcut?: string;
  readonly icon?: Icon;
};

export type ITopbarMenuItem =
  | (MenuItemBase & { readonly href: string; readonly onClick?: never; readonly anchorComponent?: never; readonly anchorProps?: never })
  | (MenuItemBase & { readonly href?: never; readonly onClick: ItemAction; readonly anchorComponent?: never; readonly anchorProps?: never })
  | (MenuItemBase & { readonly href?: never; readonly onClick?: never; readonly anchorComponent: ElementType; readonly anchorProps?: ITopbarLinkAnchorProps });

type LogoutBase = {
  readonly label?: string;
};

export type ITopbarLogoutAction =
  | (LogoutBase & { readonly href: string; readonly onClick?: never; readonly anchorComponent?: never; readonly anchorProps?: never })
  | (LogoutBase & { readonly href?: never; readonly onClick: ItemAction; readonly anchorComponent?: never; readonly anchorProps?: never })
  | (LogoutBase & { readonly href?: never; readonly onClick?: never; readonly anchorComponent: ElementType; readonly anchorProps?: ITopbarLinkAnchorProps });

export interface ITopbarProps {
  readonly organizations: BreadcrumbEntity[];
  readonly workspaces?: BreadcrumbEntity[];
  readonly pages?: BreadcrumbPage[];
  readonly disableOrganizationsDropdown?: boolean;
  readonly disableWorkspacesDropdown?: boolean;
  readonly selectedOrganizationId?: string;
  readonly selectedWorkspaceIds?: string[];
  readonly defaultSelectedWorkspaceIds?: string[];
  readonly onOrganizationSelect?: (organizationId: string) => void;
  readonly onWorkspaceSelectionChange?: (workspaceIds: string[]) => void;
  readonly links?: ITopbarLink[];
  readonly userName: IAvatarProps['name'];
  readonly userPfp?: IAvatarProps['pfp'];
  readonly userMenuItems?: ITopbarMenuItem[];
  readonly logout?: ITopbarLogoutAction;
}
