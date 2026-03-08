import { Flex, Text, Link, DropdownMenu, Button, IconButton } from '@radix-ui/themes';
import type { BreadcrumbEntity, IBreadcrumbsProps } from './Breadcrumbs.types';
import { BuildingsIcon, CaretUpDownIcon, DotsThreeIcon, HeadphonesIcon } from '@phosphor-icons/react';
import type { ReactNode } from 'react';
import { MANY_CRUMBS_THRESHOLD } from './constants';

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
  icon,
  disabled = false,
  selectedId,
  onSelect,
}: {
  entities: BreadcrumbEntity[];
  icon: ReactNode;
  disabled?: boolean;
  selectedId?: string;
  onSelect?: (entityId: string) => void;
}) => {
  const selectedEntity = entities.find((entity) => entity.id === selectedId) ?? entities[0];

  if (!selectedEntity) {
    return null;
  }

  if (disabled) {
    return (
      <Button variant="ghost" color="gray" disabled>
        <Flex align="center" gap="1">
          {icon}
          <Text size="1">{selectedEntity.name}</Text>
        </Flex>
      </Button>
    );
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
        <DropdownMenu.RadioGroup onValueChange={onSelect} value={selectedEntity.id}>
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

const EntityLabel = ({ name, icon }: { name: string; icon: ReactNode }) => (
  <Flex align="center" gap="1">
    {icon}
    <Text color="gray" size="1">
      {name}
    </Text>
  </Flex>
);

const DEFAULT_WORKSPACE_NAME = 'Default';

/**
 * Breadcrumbs component for navigation within the application.
 */
const Breadcrumbs = ({
  organizations,
  workspaces = [],
  pages = [],
  disableOrganizationsDropdown = false,
  disableWorkspacesDropdown = false,
  selectedOrganizationId,
  selectedWorkspaceId,
  onOrganizationSelect,
  onWorkspaceSelect,
}: IBreadcrumbsProps) => {
  const hasOrganizations = organizations.length > 0;
  const hasWorkspaces = workspaces.length > 0;
  const workspaceLabelName = hasWorkspaces ? workspaces[0].name : DEFAULT_WORKSPACE_NAME;
  const showWorkspaceLabel = workspaces.length <= 1;
  const hasWorkspaceSegment = true;
  const hasPrefixSegments = hasOrganizations || hasWorkspaceSegment;
  const showOrganizationLabel = organizations.length === 1;
  const firstPage = pages[0];
  const lastPage = pages.length > 0 ? pages[pages.length - 1] : undefined;
  const middlePages = pages.slice(1, pages.length - 1);
  const showCollapsedPages = pages.length >= MANY_CRUMBS_THRESHOLD && middlePages.length > 0;

  return (
    <Flex align="center" gap="2">
      {showOrganizationLabel ? (
        <EntityLabel name={organizations[0].name} icon={<BuildingsIcon size={16} weight="bold" />} />
      ) : null}

      {!showOrganizationLabel && hasOrganizations ? (
        <EntityDropdown
          entities={organizations}
          icon={<BuildingsIcon size={16} weight="bold" />}
          disabled={disableOrganizationsDropdown}
          selectedId={selectedOrganizationId}
          onSelect={onOrganizationSelect}
        />
      ) : null}

      {hasOrganizations && hasWorkspaceSegment ? <BreadcrumbSeparator /> : null}

      {showWorkspaceLabel ? (
        <EntityLabel name={workspaceLabelName} icon={<HeadphonesIcon size={16} weight="bold" />} />
      ) : null}

      {!showWorkspaceLabel && hasWorkspaces ? (
        <EntityDropdown
          entities={workspaces}
          icon={<HeadphonesIcon size={16} weight="bold" />}
          disabled={disableWorkspacesDropdown}
          selectedId={selectedWorkspaceId}
          onSelect={onWorkspaceSelect}
        />
      ) : null}

      {showCollapsedPages && firstPage ? (
        <>
          <Flex display="inline-flex" gap="1" key={`${firstPage.name}-${firstPage.link}`}>
            {hasPrefixSegments ? <BreadcrumbSeparator /> : null}
            <Link color="gray" size="1" underline="hover" href={firstPage.link}>
              {firstPage.name}
            </Link>
          </Flex>

          <Flex display="inline-flex" gap="1" key="middle-pages-dropdown">
            <BreadcrumbSeparator />
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <IconButton variant="ghost" color="gray" size="2" aria-label="Show more pages">
                  <DotsThreeIcon size={14} weight="bold" />
                </IconButton>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content size="2" variant="soft">
                {middlePages.map((page) => (
                  <DropdownMenu.Item key={`${page.name}-${page.link}`} asChild>
                    <Link href={page.link}>{page.name}</Link>
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </Flex>

          {lastPage ? (
            <Flex display="inline-flex" gap="1" key={`${lastPage.name}-${lastPage.link}`}>
              <BreadcrumbSeparator />
              <Text color="gray" size="1">
                {lastPage.name}
              </Text>
            </Flex>
          ) : null}
        </>
      ) : (
        pages.map((page, index) => {
          const isLast = index === pages.length - 1;
          const shouldShowSeparator = hasPrefixSegments || index > 0;

          return (
            <Flex display="inline-flex" gap="1" key={`${page.name}-${page.link}`}>
              {shouldShowSeparator ? <BreadcrumbSeparator /> : null}
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
        })
      )}
    </Flex>
  );
};

export default Breadcrumbs;
export type { IBreadcrumbsProps } from './Breadcrumbs.types';
