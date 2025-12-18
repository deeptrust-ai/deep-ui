import { Flex, Text, Link } from '@radix-ui/themes';
// import { HeadphonesIcon } from '@phosphor-icons/react';
import type { IBreadcrumbsProps } from './Breadcrumbs.types';
import OrganizationDropdown from '../../atom/OrganizationDropdown';
import React from 'react';
import { HeadphonesIcon } from '@phosphor-icons/react';

const BreadcrumbSeparator = () => (
  <Text color="gray" size="1">
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
  </Text>
);
/**
 * Breadcrumbs component for navigation within the application.
 */
const Breadcrumbs = ({ organizations, crumbs = [] }: IBreadcrumbsProps) => {
  return (
    <Flex align="center" gap="2">
      <OrganizationDropdown organizations={organizations} />

      <Flex display="inline-flex" align="center" gap="1" asChild>
        <Link href="#/workspace" color="gray" size="1" underline="hover">
          <Text weight="bold" size="1" asChild>
            <HeadphonesIcon weight="bold" size={16} />
          </Text>{' '}
          Workspace
        </Link>
      </Flex>

      {crumbs.length &&
        crumbs.map((crumb) => (
          <React.Fragment key={crumb.href}>
            <BreadcrumbSeparator />
            <Link color="gray" size="1" underline="hover" href={crumb.href} key={crumb.href}>
              {crumb.label}
            </Link>
          </React.Fragment>
        ))}
    </Flex>
  );
};

export default Breadcrumbs;
export type { IBreadcrumbsProps } from './Breadcrumbs.types';
