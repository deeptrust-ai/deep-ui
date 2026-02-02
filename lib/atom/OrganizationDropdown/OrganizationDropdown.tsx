import { DropdownMenu, Text, Flex, Button } from '@radix-ui/themes';
import { BuildingsIcon, CaretUpDownIcon } from '@phosphor-icons/react';
import styles from './OrganizationDropdown.module.css';
import type { IOrganizationDropdownProps } from './types';

/**
 * OrganizationDropdown component allows users to select an organization from a dropdown menu.
 *
 * It displays the selected organization's name along with an icon and a "Trial" badge if applicable.
 */
export const OrganizationDropdown = ({ organizations }: IOrganizationDropdownProps) => {
  const selectedOrg = organizations.find((org) => org.selected) || organizations[0];

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="ghost" color="gray" className={styles.triggerButton}>
          <Flex align="center" gap="2">
            <Text color="gray" size="1">
              <BuildingsIcon size={16} className={styles.icon} weight="bold" />
              {selectedOrg.name}
              <CaretUpDownIcon size={16} className={styles.icon} weight="bold" />
            </Text>
          </Flex>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content size="2" variant="soft" className={styles.orgDropdown}>
        <DropdownMenu.Label>Organizations</DropdownMenu.Label>
        <DropdownMenu.RadioGroup onValueChange={() => {}} value={selectedOrg.name}>
          {organizations.map((org) => (
            <DropdownMenu.RadioItem key={org.name} value={org.name} className={styles.radioItem}>
              {org.name}
            </DropdownMenu.RadioItem>
          ))}
        </DropdownMenu.RadioGroup>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default OrganizationDropdown;
export type { IOrganizationDropdownProps } from './types';
