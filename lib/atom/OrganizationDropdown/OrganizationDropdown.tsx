import {
  DropdownMenu as FrostedDropdown,
  Text as FrostedText,
  Button as FrostedButton,
} from 'frosted-ui';
import { BuildingsIcon, CaretUpDownIcon } from '@phosphor-icons/react';
import styles from './styles.module.css';
import type { IOrganizationDropdownProps } from './types';

/**
 * OrganizationDropdown component allows users to select an organization from a dropdown menu.
 *
 * It displays the selected organization's name along with an icon and a "Trial" badge if applicable.
 */
export const OrganizationDropdown = ({ organizations }: IOrganizationDropdownProps) => {
  const selectedOrg = organizations.find((org) => org.selected) || organizations[0];

  return (
    <FrostedDropdown.Root>
      <FrostedDropdown.Trigger>
        <div>
          <FrostedButton
            variant="ghost"
            color="gray"
            className={styles.triggerButton}
            type="button"
          >
            <FrostedText color="gray" size="1">
              <BuildingsIcon size={16} className={styles.icon} weight="bold" />
              {selectedOrg.name}
              <CaretUpDownIcon size={16} className={styles.icon} weight="bold" />
            </FrostedText>
          </FrostedButton>
        </div>
      </FrostedDropdown.Trigger>
      <FrostedDropdown.Content size="2" variant="translucent" className={styles.orgDropdown}>
        <FrostedDropdown.Label>Organizations</FrostedDropdown.Label>
        <FrostedDropdown.RadioGroup onValueChange={() => {}} value={selectedOrg.name}>
          {organizations.map((org) => (
            <FrostedDropdown.RadioItem key={org.name} value={org.name} className={styles.radioItem}>
              {org.name}
            </FrostedDropdown.RadioItem>
          ))}
        </FrostedDropdown.RadioGroup>
      </FrostedDropdown.Content>
    </FrostedDropdown.Root>
  );
};

OrganizationDropdown.displayName = 'OrganizationDropdown';

export default OrganizationDropdown;
export type { IOrganizationDropdownProps } from './types';
