import { Breadcrumbs as FrostedBreadcrumbs } from 'frosted-ui';
import { HeadphonesIcon } from '@phosphor-icons/react';
import type { IBreadcrumbsProps } from './types';
import styles from './styles.module.css';
import OrganizationDropdown from '../../atom/OrganizationDropdown';
import { MANY_CRUMBS_THRESHOLD } from './constants';

const buildCrumbElements = (crumbs: NonNullable<IBreadcrumbsProps['crumbs']>) => {
  return [
    <FrostedBreadcrumbs.Dropdown key="crumb-overflow">
      {crumbs.map((crumb) => (
        <FrostedBreadcrumbs.DropdownItem key={crumb.href} asChild className={styles.crumb}>
          <a href={crumb.href}>{crumb.label}</a>
        </FrostedBreadcrumbs.DropdownItem>
      ))}
    </FrostedBreadcrumbs.Dropdown>,
  ];
};

/**
 * Breadcrumbs component for navigation within the application.
 *
 * Open Question: does Workspace ever change? Should it link somewhere dynamic or always the same link?
 */
const Breadcrumbs = ({ organizations, crumbs = [] }: IBreadcrumbsProps) => {
  const hasCrumbs = crumbs.length > 0;
  const firstCrumb = hasCrumbs ? crumbs[0] : undefined;
  const lastCrumb = hasCrumbs ? crumbs[crumbs.length - 1] : undefined;

  const children = [
    <FrostedBreadcrumbs.Item key="org">
      <OrganizationDropdown organizations={organizations} />
    </FrostedBreadcrumbs.Item>,
    <FrostedBreadcrumbs.Item asChild key="workspace" className={styles.crumb}>
      <a href="#/workspace" className={styles.workspaceCrumbLink}>
        <HeadphonesIcon className={styles.icon} weight="bold" size={16} /> Workspace
      </a>
    </FrostedBreadcrumbs.Item>,
  ];

  if (firstCrumb) {
    children.push(
      <FrostedBreadcrumbs.Item key={firstCrumb.href} asChild className={styles.crumb}>
        <a href={firstCrumb.href}>{firstCrumb.label}</a>
      </FrostedBreadcrumbs.Item>
    );
  }

  if (crumbs.length > MANY_CRUMBS_THRESHOLD) {
    const withoutFirstLastCrumb = crumbs.slice(1, crumbs.length - 1);
    children.push(...buildCrumbElements(withoutFirstLastCrumb));
  }

  if (lastCrumb) {
    children.push(
      <FrostedBreadcrumbs.Item key={lastCrumb.href} asChild className={styles.crumb}>
        <a href={lastCrumb.href}>{lastCrumb.label}</a>
      </FrostedBreadcrumbs.Item>
    );
  }

  return (
    <div>
      <FrostedBreadcrumbs.Root color="gray">{children}</FrostedBreadcrumbs.Root>
    </div>
  );
};

export default Breadcrumbs;
export type { IBreadcrumbsProps } from './types';
