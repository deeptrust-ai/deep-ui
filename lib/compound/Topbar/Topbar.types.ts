import type { Icon } from '@phosphor-icons/react';
import type { IOrganizationDropdown } from '../../atom/OrganizationDropdown/types';
import type { IAvatarProps } from '../../atom/Avatar/types';
import type { Crumb } from '../../molecule/Breadcrumbs/Breadcrumbs.types';

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
  readonly breadcrumbs?: Crumb[];
  readonly organizations: IOrganizationDropdown[];
  readonly userName: IAvatarProps['name'];
  readonly userPfp?: IAvatarProps['pfp'];
  // Logout can be either a link or an onClick action but is required
  readonly userMetaDropdown?: UserMetaDropdown;
}
