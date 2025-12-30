import type { IOrganizationDropdown } from '../../atom/OrganizationDropdown/types';
import type { IAvatarProps } from '../../atom/Avatar/types';
import type { Crumb } from '../../molecule/Breadcrumbs/Breadcrumbs.types';

export interface ITopbarProps {
  readonly breadcrumbs?: Crumb[];
  readonly organizations: IOrganizationDropdown[];
  readonly userName: IAvatarProps['name'];
  readonly userPfp?: IAvatarProps['pfp'];
}
