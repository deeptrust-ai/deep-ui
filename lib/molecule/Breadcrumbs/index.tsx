import { Breadcrumbs as FrostedBreadcrumbs, Link as FrostedLink } from 'frosted-ui';
import { HeadphonesIcon } from '@phosphor-icons/react';
import type { IBreadcrumbsProps } from './types';
import styles from './styles.module.css';
import OrganizationDropdown from '../../atom/OrganizationDropdown';
import { MANY_CRUMBS_THRESHOLD } from './constants';

const buildCrumbElements = (
  crumbs: NonNullable<IBreadcrumbsProps['crumbs']>,
  threshold: number
) => {
  if (crumbs.length > threshold) {
    return [
      <FrostedBreadcrumbs.Dropdown key="crumb-overflow">
        {crumbs.map((crumb) => (
          <FrostedBreadcrumbs.DropdownItem key={crumb.href} asChild>
            <a href={crumb.href}>{crumb.label}</a>
          </FrostedBreadcrumbs.DropdownItem>
        ))}
      </FrostedBreadcrumbs.Dropdown>,
    ];
  }

  return crumbs.map((crumb) => (
    <FrostedBreadcrumbs.Item key={crumb.href} asChild>
      <FrostedLink href={crumb.href}>{crumb.label}</FrostedLink>
    </FrostedBreadcrumbs.Item>
  ));
};

/**
 * Breadcrumbs component for navigation within the application.
 *
 * Open Question: does Workspace ever change? Should it link somewhere dynamic or always the same link?
 */
const Breadcrumbs = ({
  organizations,
  crumbs = [],
  overflowThreshold = MANY_CRUMBS_THRESHOLD,
}: IBreadcrumbsProps) => {
  const hasCrumbs = crumbs.length > 0;
  const lastCrumb = hasCrumbs ? crumbs[crumbs.length - 1] : undefined;

  const children = [
    <FrostedBreadcrumbs.Item asChild key="org">
      <OrganizationDropdown organizations={organizations} />
    </FrostedBreadcrumbs.Item>,
    <FrostedBreadcrumbs.Item asChild key="workspace">
      <FrostedLink color="gray" href="#/workspace" className={styles.workspaceCrumbLink}>
        <HeadphonesIcon className={styles.icon} weight="bold" size={16} /> Workspace
      </FrostedLink>
    </FrostedBreadcrumbs.Item>,
  ];

  if (hasCrumbs) {
    children.push(...buildCrumbElements(crumbs.slice(0, -1), overflowThreshold));
  }

  if (lastCrumb) {
    children.push(
      <FrostedBreadcrumbs.Item key={lastCrumb.href} asChild>
        <FrostedLink color="gray" href={lastCrumb.href}>
          {lastCrumb.label}
        </FrostedLink>
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
