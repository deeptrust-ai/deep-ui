import { Flex, Text, Link, DropdownMenu, Button } from '@radix-ui/themes';
import type { BreadcrumbEntity, IBreadcrumbsProps } from './Breadcrumbs.types';
import { BuildingsIcon, CaretUpDownIcon, HeadphonesIcon } from '@phosphor-icons/react';
import type { ReactNode } from 'react';

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
const EntityDropdown = ({
  entities,
  label,
  icon,
}: {
  entities: BreadcrumbEntity[];
  label: string;
  icon: ReactNode;
}) => {
  const selectedEntity = entities[0];

  if (!selectedEntity) {
    return null;
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="ghost" color="gray">
          <Flex align="center" gap="1">
            {icon}
            <Text size="1">{selectedEntity.name}</Text>
            <CaretUpDownIcon size={14} weight="bold" />
          </Flex>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content size="2" variant="soft">
        <DropdownMenu.Label>{label}</DropdownMenu.Label>
        <DropdownMenu.RadioGroup onValueChange={() => {}} value={selectedEntity.id}>
          {entities.map((entity) => (
            <DropdownMenu.RadioItem key={entity.id} value={entity.id}>
              {entity.name}
            </DropdownMenu.RadioItem>
          ))}
        </DropdownMenu.RadioGroup>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

/**
 * Breadcrumbs component for navigation within the application.
 */
const Breadcrumbs = ({ organizations, workspaces, pages = [] }: IBreadcrumbsProps) => {
  const hasOrganizations = organizations.length > 0;
  const hasWorkspaces = workspaces.length > 0;

  return (
    <Flex align="center" gap="2">
      {hasOrganizations ? (
        <EntityDropdown
          entities={organizations}
          label="Organizations"
          icon={<BuildingsIcon size={16} weight="bold" />}
        />
      ) : null}

      {hasOrganizations && hasWorkspaces ? <BreadcrumbSeparator /> : null}

      {hasWorkspaces ? (
        <EntityDropdown
          entities={workspaces}
          label="Workspaces"
          icon={<HeadphonesIcon size={16} weight="bold" />}
        />
      ) : null}

      {pages.map((page, index) => {
        const isLast = index === pages.length - 1;

        return (
          <Flex display="inline-flex" gap="1" key={`${page.name}-${page.link}`}>
            <BreadcrumbSeparator />
            {isLast ? (
              <Text color="gray" size="1">
                {page.name}
              </Text>
            ) : (
              <Link color="gray" size="1" underline="hover" href={page.link}>
                {page.name}
              </Link>
            )}
          </Flex>
        );
      })}
    </Flex>
  );
};

export default Breadcrumbs;
export type { IBreadcrumbsProps } from './Breadcrumbs.types';
