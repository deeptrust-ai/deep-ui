import { forwardRef } from 'react';
import {
  Button as FrostedButton,
  DropdownMenu as FrostedDropdown,
  Text as FrostedText,
} from 'frosted-ui';
import { BuildingsIcon, CaretUpDownIcon } from '@phosphor-icons/react';
import styles from './styles.module.css';
import type { IOrganizationDropdownProps } from './types';

/**
 * OrganizationDropdown component allows users to select an organization from a dropdown menu.
 *
 * It displays the selected organization's name along with an icon and a "Trial" badge if applicable.
 *
 * This component passes through the [`asChild` composition prop](https://www.radix-ui.com/primitives/docs/guides/composition#composing-multiple-primitives) to the underlying button element.
 */
const OrganizationDropdown = forwardRef<HTMLButtonElement, IOrganizationDropdownProps>(
  ({ organizations, ...restProps }: IOrganizationDropdownProps, forwardedRef) => {
    const selectedOrg = organizations.find((org) => org.selected) || organizations[0];

    return (
      <FrostedDropdown.Root>
        <FrostedDropdown.Trigger>
          <FrostedButton type="button" variant="ghost" color="gray">
            <FrostedText size="1" className={styles.orgName} weight="medium">
              <BuildingsIcon size={16} className={styles.icon} weight="bold" /> {selectedOrg.name}
              <CaretUpDownIcon size={16} className={styles.icon} weight="bold" />
            </FrostedText>
          </FrostedButton>
        </FrostedDropdown.Trigger>
        <FrostedDropdown.Content size="2" variant="translucent" className={styles.orgDropdown}>
          <FrostedDropdown.Label>Organizations</FrostedDropdown.Label>
          <FrostedDropdown.RadioGroup onValueChange={() => {}} value={selectedOrg.name}>
            {organizations.map((org) => (
              <FrostedDropdown.RadioItem
                key={org.name}
                value={org.name}
                className={styles.radioItem}
              >
                {org.name}
              </FrostedDropdown.RadioItem>
            ))}
          </FrostedDropdown.RadioGroup>
        </FrostedDropdown.Content>
      </FrostedDropdown.Root>
    );
  }
);

OrganizationDropdown.displayName = 'OrganizationDropdown';

export default OrganizationDropdown;
export type { IOrganizationDropdownProps } from './types';
