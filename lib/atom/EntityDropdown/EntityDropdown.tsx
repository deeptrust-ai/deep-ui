import { DropdownMenu, Text, Flex, Button } from '@radix-ui/themes';
import { BuildingsIcon, CaretUpDownIcon } from '@phosphor-icons/react';
import styles from './EntityDropdown.module.css';
import type { IEntityDropdownProps } from './types';

/**
 * EntityDropdown component allows users to select an organization, workspace, or other entity.
 */
export const EntityDropdown = ({
  entities,
  organizations,
  label = 'Entities',
  icon = <BuildingsIcon size={16} className={styles.icon} weight="bold" />,
  ...buttonProps
}: IEntityDropdownProps) => {
  const options = entities ?? organizations ?? [];
  const selectedEntity = options.find((entity) => entity.selected) ?? options[0];

  if (!selectedEntity) {
    return null;
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button
          variant="ghost"
          color="gray"
          className={styles.triggerButton}
          {...buttonProps}
        >
          <Flex align="center" gap="2">
            <Text color="gray" size="1">
              {icon}
              {selectedEntity.name}
              <CaretUpDownIcon size={16} className={styles.icon} weight="bold" />
            </Text>
          </Flex>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content size="2" variant="soft" className={styles.dropdownContent}>
        <DropdownMenu.Label>{label}</DropdownMenu.Label>
        <DropdownMenu.RadioGroup onValueChange={() => {}} value={selectedEntity.name}>
          {options.map((entity) => (
            <DropdownMenu.RadioItem
              key={entity.name}
              value={entity.name}
              className={styles.radioItem}
            >
              {entity.name}
            </DropdownMenu.RadioItem>
          ))}
        </DropdownMenu.RadioGroup>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

/** @deprecated Use {@link EntityDropdown} instead. */
export const OrganizationDropdown = EntityDropdown;

export default EntityDropdown;
export type { IEntityDropdownProps } from './types';
