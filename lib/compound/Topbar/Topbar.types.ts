import type { Icon } from '@phosphor-icons/react';
import type { IAvatarProps } from '../../atom/Avatar/types';
import type {
  BreadcrumbEntity,
  BreadcrumbPage,
} from '../../molecule/Breadcrumbs/Breadcrumbs.types';

type ItemLink = string;
type ItemAction = () => void | Promise<void>;

type LinkOrAction<TLinkKey extends string, TActionKey extends string> =
  | ({
      readonly [Key in TLinkKey]: ItemLink;
    } & {
      readonly [Key in TActionKey]?: never;
    })
  | ({
      readonly [Key in TLinkKey]?: never;
    } & {
      readonly [Key in TActionKey]: ItemAction;
    });

type UserDropdownMenuItem = LinkOrAction<'link', 'onClick'> & {
  readonly label: string;
  readonly shortcut?: string;
  readonly icon?: Icon;
};

type UserMetaDropdown = LinkOrAction<'logOutLink', 'logOutOnClick'> & {
  readonly dropdownItem?: UserDropdownMenuItem[];
};

export interface ITopbarProps {
  readonly breadcrumbs?: BreadcrumbPage[];
  readonly organizations: BreadcrumbEntity[] | string;
  readonly workspaces: BreadcrumbEntity[];
  readonly disableOrganizationsDropdown?: boolean;
  readonly disableWorkspacesDropdown?: boolean;
  readonly userName: IAvatarProps['name'];
  readonly userPfp?: IAvatarProps['pfp'];
  // Logout can be either a link or an onClick action but is required
  readonly userMetaDropdown?: UserMetaDropdown;
}
