import { Breadcrumbs as FrostedBreadcrumbs, Link as FrostedLink } from 'frosted-ui';
import { HeadphonesIcon } from '@phosphor-icons/react';
import type { IBreadcrumbsProps } from './types';
import styles from './styles.module.css';
import OrganizationDropdown from '../../atom/OrganizationDropdown';
import { MANY_CRUMBS_THRESHOLD } from './constants';

const buildCrumbElements = (crumbs: NonNullable<IBreadcrumbsProps['crumbs']>) => {
  if (crumbs.length > MANY_CRUMBS_THRESHOLD) {
    return [
      <FrostedBreadcrumbs.Dropdown key="crumb-overflow">
        {crumbs.slice(0, -1).map((crumb) => (
          <FrostedBreadcrumbs.DropdownItem key={crumb.href} asChild>
            <FrostedLink href={crumb.href}>{crumb.label}</FrostedLink>
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
  const hasManyCrumbs = crumbs.length > overflowThreshold;
  const lastCrumb = hasManyCrumbs ? crumbs[crumbs.length - 1] : undefined;

  const children = [
    <FrostedBreadcrumbs.Item asChild key="org">
      <OrganizationDropdown organizations={organizations} />
    </FrostedBreadcrumbs.Item>,
    <FrostedBreadcrumbs.Item asChild key="workspace">
      <a href="#/workspace">
        <HeadphonesIcon className={styles.icon} weight="bold" size={16} /> Workspace
      </a>
    </FrostedBreadcrumbs.Item>,
  ];

  if (hasCrumbs) {
    children.push(...buildCrumbElements(crumbs));
  }

  if (lastCrumb) {
    children.push(
      <FrostedBreadcrumbs.Item key={lastCrumb.href} asChild>
        <FrostedLink href={lastCrumb.href}>{lastCrumb.label}</FrostedLink>
      </FrostedBreadcrumbs.Item>
    );
  }

  return <FrostedBreadcrumbs.Root color="gray">{children}</FrostedBreadcrumbs.Root>;
};

export default Breadcrumbs;
export type { IBreadcrumbsProps } from './types';
