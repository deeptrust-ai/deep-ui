import {
  Breadcrumbs as FrostedBreadcrumbs,
  DropdownMenu as FrostedDropdown,
  Text as FrostedText,
  Link as FrostedLink,
} from 'frosted-ui';
import { BuildingsIcon, CaretUpDownIcon, HeadphonesIcon } from '@phosphor-icons/react';
import type { IBreadcrumbsProps } from './types';
import Badge from '../../atom/Badge';
import styles from './styles.module.css';

const Breadcrumbs = ({ organizations }: IBreadcrumbsProps) => {
  const selectedOrg = organizations.find((org) => org.selected) || organizations[0];

  return (
    <FrostedBreadcrumbs.Root color="gray">
      <FrostedBreadcrumbs.Item asChild>
        <FrostedDropdown.Root>
          <FrostedDropdown.Trigger className={styles.orgTrigger}>
            <button type="button">
              <FrostedText size="1" className={styles.orgName} weight="medium">
                <BuildingsIcon size={16} className={styles.icon} weight="bold" /> {selectedOrg.name}{' '}
                {selectedOrg.isTrial ? <Badge label="Trial" /> : null}{' '}
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
      </FrostedBreadcrumbs.Item>
      <FrostedBreadcrumbs.Item asChild>
        <a href="#">
          <HeadphonesIcon className={styles.icon} weight="bold" size={16} /> Workspace
        </a>
      </FrostedBreadcrumbs.Item>
      <FrostedBreadcrumbs.Item>Project</FrostedBreadcrumbs.Item>
    </FrostedBreadcrumbs.Root>
  );
};

export default Breadcrumbs;
