import { Breadcrumbs as FrostedBreadcrumbs, Text as FrostedText } from 'frosted-ui';
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
 * **Open Question:** does Workspace ever change? Should it link somewhere dynamic or always the same link? Does icon ever change?
 *
 * **Open Issues:** A11y concerns with currently used colors, need to align with design team on final colors (Expected contrast ratio of 4.5:1)
 */
const Breadcrumbs = ({ organizations, crumbs = [] }: IBreadcrumbsProps) => {
  const hasCrumbs = crumbs.length > 0;
  const firstCrumb = hasCrumbs ? crumbs[0] : undefined;
  const lastCrumb = hasCrumbs ? crumbs[crumbs.length - 1] : undefined;

  const children = [
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

  if (crumbs.length >= MANY_CRUMBS_THRESHOLD) {
    const withoutFirstLastCrumb = crumbs.slice(1, crumbs.length - 1);

    if (withoutFirstLastCrumb.length > 1) {
      children.push(...buildCrumbElements(withoutFirstLastCrumb));
    } else {
      children.push(
        <FrostedBreadcrumbs.Item
          key={withoutFirstLastCrumb[0].href}
          asChild
          className={styles.crumb}
        >
          <a href={withoutFirstLastCrumb[0].href}>{withoutFirstLastCrumb[0].label}</a>
        </FrostedBreadcrumbs.Item>
      );
    }
  }

  if (lastCrumb && crumbs.length > 1) {
    children.push(
      <FrostedBreadcrumbs.Item key={lastCrumb.href} asChild className={styles.crumb}>
        <a href={lastCrumb.href}>{lastCrumb.label}</a>
      </FrostedBreadcrumbs.Item>
    );
  }

  return (
    <div className={styles.breadcrumbsContainer}>
      <OrganizationDropdown organizations={organizations} />
      <FrostedText color="gray" size="1" className={styles.separator}>
        <svg
          width="6"
          height="10"
          viewBox="0 0 6 10"
          xmlns="http://www.w3.org/2000/svg"
          fill="var(--accent-a8)"
          className="fui-BreadcrumbsSeparator"
        >
          <path d="M1.25 9.625C1.07422 9.625 0.917969 9.56641 0.800781 9.44922C0.546875 9.21484 0.546875 8.80469 0.800781 8.57031L4.10156 5.25L0.800781 1.94922C0.546875 1.71484 0.546875 1.30469 0.800781 1.07031C1.03516 0.816406 1.44531 0.816406 1.67969 1.07031L5.42969 4.82031C5.68359 5.05469 5.68359 5.46484 5.42969 5.69922L1.67969 9.44922C1.5625 9.56641 1.40625 9.625 1.25 9.625Z"></path>
        </svg>
      </FrostedText>
      <FrostedBreadcrumbs.Root color="gray">{children}</FrostedBreadcrumbs.Root>
    </div>
  );
};

export default Breadcrumbs;
export type { IBreadcrumbsProps } from './types';
