import {
  Breadcrumbs as FrostedBreadcrumbs,
  DropdownMenu as FrostedDropdown,
  Text as FrostedText,
} from 'frosted-ui';
import { BuildingsIcon, CaretUpDownIcon, HeadphonesIcon } from '@phosphor-icons/react';
import type { IBreadcrumbsProps } from './types';
import Chip from '../../atom/Chip';
import styles from './styles.module.css';

const Breadcrumbs = ({ organizations }: IBreadcrumbsProps) => {
  const selectedOrg = organizations.find((org) => org.selected) || organizations[0];

  return (
    <FrostedBreadcrumbs.Root color="gray">
      <FrostedBreadcrumbs.Item>
        <FrostedDropdown.Root>
          <FrostedDropdown.Trigger className={styles.orgTrigger}>
            <button type="button" className={styles.orgTrigger}>
              <FrostedText size="1" className={styles.orgName}>
                <BuildingsIcon size={12} className={styles.icon} weight="bold" /> {selectedOrg.name}{' '}
                {selectedOrg.isTrial ? <Chip label="Trial" /> : null}{' '}
                <CaretUpDownIcon size={12} className={styles.icon} weight="bold" />
              </FrostedText>
            </button>
          </FrostedDropdown.Trigger>
          <FrostedDropdown.Content size="2" variant="translucent">
            <FrostedDropdown.Label>Organizations</FrostedDropdown.Label>
            <FrostedDropdown.RadioGroup onValueChange={() => {}} value={selectedOrg.name}>
              {organizations.map((org) => (
                <FrostedDropdown.RadioItem key={org.name} value={org.name}>
                  {org.name} {org.isTrial ? <Chip label="Trial" /> : null}
                </FrostedDropdown.RadioItem>
              ))}
            </FrostedDropdown.RadioGroup>
          </FrostedDropdown.Content>
        </FrostedDropdown.Root>
      </FrostedBreadcrumbs.Item>
      <FrostedBreadcrumbs.Item asChild>
        <FrostedText size="1">
          <HeadphonesIcon className={styles.icon} weight="bold" /> Workspace
        </FrostedText>
      </FrostedBreadcrumbs.Item>
      <FrostedBreadcrumbs.Item>Project</FrostedBreadcrumbs.Item>
    </FrostedBreadcrumbs.Root>
  );
};

export default Breadcrumbs;
