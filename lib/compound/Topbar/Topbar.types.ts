import type { Icon } from '@phosphor-icons/react';
import type { ComponentPropsWithoutRef, ElementType } from 'react';
import type { IAvatarProps } from '../../atom/Avatar/types';
import type { ILogoAnchorProps } from '../../atom/Logo/types';
import type { BreadcrumbEntity, BreadcrumbPage } from '../../molecule/Breadcrumbs';

/** Callback for menu-item and logout actions (may be async). */
type ItemAction = () => void | Promise<void>;

/** Anchor element props passed to a topbar navigation link. */
export type ITopbarLinkAnchorProps = Omit<ComponentPropsWithoutRef<'a'>, 'children'> & {
  readonly to?: string;
  readonly [key: string]: unknown;
};

/** A single navigation link rendered in the topbar. */
export interface ITopbarLink {
  readonly anchorComponent?: ElementType;
  readonly anchorProps?: ITopbarLinkAnchorProps;
  readonly icon?: Icon;
  readonly label: string;
  readonly selected?: boolean;
  readonly activeClassName?: string;
}

/** Shared fields for all topbar dropdown menu items. */
type MenuItemBase = {
  readonly label: string;
  readonly shortcut?: string;
  readonly icon?: Icon;
};

/** Discriminated union for a topbar dropdown menu item (href, onClick, or custom anchor). */
export type ITopbarMenuItem =
  | (MenuItemBase & { readonly href: string; readonly onClick?: never; readonly anchorComponent?: never; readonly anchorProps?: never })
  | (MenuItemBase & { readonly href?: never; readonly onClick: ItemAction; readonly anchorComponent?: never; readonly anchorProps?: never })
  | (MenuItemBase & { readonly href?: never; readonly onClick?: never; readonly anchorComponent: ElementType; readonly anchorProps?: ITopbarLinkAnchorProps });

/** Shared fields for the topbar logout action. */
type LogoutBase = {
  readonly label?: string;
  readonly shortcut?: string;
};

/** Discriminated union for the topbar logout action (href, onClick, or custom anchor). */
export type ITopbarLogoutAction =
  | (LogoutBase & { readonly href: string; readonly onClick?: never; readonly anchorComponent?: never; readonly anchorProps?: never })
  | (LogoutBase & { readonly href?: never; readonly onClick: ItemAction; readonly anchorComponent?: never; readonly anchorProps?: never })
  | (LogoutBase & { readonly href?: never; readonly onClick?: never; readonly anchorComponent: ElementType; readonly anchorProps?: ITopbarLinkAnchorProps });

/** Props for the {@link Topbar} compound component. */
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
  readonly logoAnchorComponent?: ElementType;
  readonly logoAnchorProps?: ILogoAnchorProps;
  readonly userName: IAvatarProps['name'];
  readonly userPfp?: IAvatarProps['pfp'];
  readonly userMenuItems?: ITopbarMenuItem[];
  readonly logout?: ITopbarLogoutAction;
}
