import { Breadcrumbs as FrostedBreadcrumbs } from 'frosted-ui';
import { HeadphonesIcon } from '@phosphor-icons/react';
import type { IBreadcrumbsProps } from './types';
import styles from './styles.module.css';
import OrganizationDropdown from '../../atom/OrganizationDropdown';

const Breadcrumbs = ({ organizations }: IBreadcrumbsProps) => {
  return (
    <FrostedBreadcrumbs.Root color="gray">
      <FrostedBreadcrumbs.Item asChild>
        <OrganizationDropdown organizations={organizations} />
      </FrostedBreadcrumbs.Item>
      <FrostedBreadcrumbs.Item asChild>
        <button type="button">
          <HeadphonesIcon className={styles.icon} weight="bold" size={16} /> Workspace
        </button>
      </FrostedBreadcrumbs.Item>
      <FrostedBreadcrumbs.Item>Project</FrostedBreadcrumbs.Item>
    </FrostedBreadcrumbs.Root>
  );
};

export default Breadcrumbs;
export type { IBreadcrumbsProps } from './types';
