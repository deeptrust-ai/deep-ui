import type { IOrganizationDropdown } from '../../atom/OrganizationDropdown/types';
import type { IAvatarProps } from '../../atom/Avatar/types';

export interface IHeaderProps {
  organizations: IOrganizationDropdown[];
  userName: IAvatarProps['name'];
  userPfp?: IAvatarProps['pfp'];
}
