import { forwardRef } from 'react';
import { DropdownMenu as FrostedDropdown, Text as FrostedText, Button } from 'frosted-ui';
import { BuildingsIcon, CaretUpDownIcon } from '@phosphor-icons/react';
import styles from './styles.module.css';
import Badge from '../Badge';
import type { IOrganizationDropdownProps } from './types';

const OrganizationDropdown = forwardRef<HTMLButtonElement, IOrganizationDropdownProps>(
  ({ organizations, ...restProps }: IOrganizationDropdownProps, forwardedRef) => {
    const selectedOrg = organizations.find((org) => org.selected) || organizations[0];

    return (
      <FrostedDropdown.Root>
        <FrostedDropdown.Trigger>
          <button type="button" {...restProps} ref={forwardedRef}>
            <FrostedText size="1" className={styles.orgName} weight="medium">
              <BuildingsIcon size={16} className={styles.icon} weight="bold" /> {selectedOrg.name}
              {selectedOrg.isTrial ? <Badge label="Trial" /> : null}
              <CaretUpDownIcon size={16} className={styles.icon} weight="bold" />
            </FrostedText>
          </button>
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
                {org.name} {org.isTrial ? <Badge label="Trial" /> : null}
              </FrostedDropdown.RadioItem>
            ))}
          </FrostedDropdown.RadioGroup>
        </FrostedDropdown.Content>
      </FrostedDropdown.Root>
    );
  }
);

export default OrganizationDropdown;
