import { Flex, Text, Link, DropdownMenu, Button, IconButton } from '@radix-ui/themes';
import type { BreadcrumbEntity, IBreadcrumbsProps } from './Breadcrumbs.types';
import {
  BuildingsIcon,
  CaretUpDownIcon,
  DotsThreeIcon,
  HeadphonesIcon,
} from '@phosphor-icons/react';
import { useState, type ReactNode } from 'react';
import { ALL_WORKSPACES_ID, ALL_WORKSPACES_NAME, MANY_CRUMBS_THRESHOLD } from './constants';

const getPageKey = (link: string, index: number) => `${link}-${index}`;

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

const WorkspaceDropdown = ({
  entities,
  disabled = false,
  selectedIds,
  defaultSelectedIds,
  onSelectionChange,
  onSingleSelect,
}: {
  entities: BreadcrumbEntity[];
  disabled?: boolean;
  selectedIds?: string[];
  defaultSelectedIds?: string[];
  onSelectionChange?: (workspaceIds: string[]) => void;
  onSingleSelect?: (workspaceId: string) => void;
}) => {
  const getFallbackSelection = () =>
    entities.length > 1
      ? [ALL_WORKSPACES_ID]
      : entities.length === 1
        ? [entities[0].id]
        : [];
  const normalizeSelection = (workspaceIds: string[]) => {
    const validIds = new Set(entities.map((entity) => entity.id));
    const filteredWorkspaceIds = workspaceIds.filter(
      (id) => id === ALL_WORKSPACES_ID || validIds.has(id)
    );

    if (filteredWorkspaceIds.length === 0) {
      return getFallbackSelection();
    }

    const nonAllIds = entities
      .filter((entity) => entity.id !== ALL_WORKSPACES_ID)
      .map((entity) => entity.id);
    const selectedNonAllIds = filteredWorkspaceIds.filter((id) => id !== ALL_WORKSPACES_ID);

    if (selectedNonAllIds.length === 0) {
      return filteredWorkspaceIds.includes(ALL_WORKSPACES_ID)
        ? [ALL_WORKSPACES_ID]
        : getFallbackSelection();
    }

    return nonAllIds.every((id) => selectedNonAllIds.includes(id))
      ? [ALL_WORKSPACES_ID]
      : selectedNonAllIds;
  };
  const [internalSelectedIds, setInternalSelectedIds] = useState<string[]>(
    normalizeSelection(
      defaultSelectedIds && defaultSelectedIds.length > 0 ? defaultSelectedIds : getFallbackSelection()
    )
  );
  const normalizedSelectedIds = normalizeSelection(selectedIds ?? internalSelectedIds);
  const allSelected = normalizedSelectedIds.includes(ALL_WORKSPACES_ID);
  const selectedWorkspaceCount = allSelected
    ? Math.max(entities.length - 1, 0)
    : normalizedSelectedIds.filter((id) => id !== ALL_WORKSPACES_ID).length;

  const triggerLabel =
    entities.length <= 1
      ? entities[0]?.name ?? DEFAULT_WORKSPACE_NAME
      : allSelected
        ? ALL_WORKSPACES_NAME
        : selectedWorkspaceCount === 1
          ? entities.find((entity) => entity.id === normalizedSelectedIds[0])?.name ?? ALL_WORKSPACES_NAME
          : `${selectedWorkspaceCount} Workspaces`;

  const handleCheckedChange = (workspaceId: string, checked: boolean | 'indeterminate') => {
    const updateSelection = (nextWorkspaceIds: string[]) => {
      const normalizedNextWorkspaceIds = normalizeSelection(nextWorkspaceIds);

      if (selectedIds === undefined) {
        setInternalSelectedIds(normalizedNextWorkspaceIds);
      }

      onSelectionChange?.(normalizedNextWorkspaceIds);

      if (onSingleSelect) {
        const selectedWorkspaceIds = normalizedNextWorkspaceIds.filter((id) => id !== ALL_WORKSPACES_ID);

        if (selectedWorkspaceIds.length === 1) {
          onSingleSelect(selectedWorkspaceIds[0]);
        }
      }
    };

    if (workspaceId === ALL_WORKSPACES_ID) {
      updateSelection(checked === true ? [ALL_WORKSPACES_ID] : []);
      return;
    }

    if (allSelected) {
      const nextSelectedIds = entities
        .filter((entity) => entity.id !== ALL_WORKSPACES_ID && entity.id !== workspaceId)
        .map((entity) => entity.id);

      updateSelection(checked === true ? [workspaceId] : nextSelectedIds);
      return;
    }

    const nextIds = new Set(normalizedSelectedIds.filter((id) => id !== ALL_WORKSPACES_ID));

    if (checked === true) {
      nextIds.add(workspaceId);
    } else if (checked === false) {
      nextIds.delete(workspaceId);
    } else {
      return;
    }

    const nextSelectedIds = entities
      .filter((entity) => entity.id !== ALL_WORKSPACES_ID && nextIds.has(entity.id))
      .map((entity) => entity.id);

    updateSelection(nextSelectedIds);
  };

  if (disabled) {
    return (
      <Button variant="ghost" color="gray" disabled>
        <Flex align="center" gap="1">
          <HeadphonesIcon size={16} weight="bold" />
          <Text size="1">{triggerLabel}</Text>
        </Flex>
      </Button>
    );
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="ghost" color="gray">
          <Flex align="center" gap="1">
            <HeadphonesIcon size={16} weight="bold" />
            <Text size="1">{triggerLabel}</Text>
            <CaretUpDownIcon size={14} weight="bold" />
          </Flex>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content size="2" variant="soft">
        {entities.map((entity) => {
          const checked = allSelected
            ? true
            : normalizedSelectedIds.includes(entity.id);

          return (
            <DropdownMenu.CheckboxItem
              key={entity.id}
              checked={checked}
              onCheckedChange={(value) => handleCheckedChange(entity.id, value)}
            >
              {entity.name}
            </DropdownMenu.CheckboxItem>
          );
        })}
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
  selectedWorkspaceIds,
  defaultSelectedWorkspaceIds,
  onOrganizationSelect,
  onWorkspaceSelect,
  onWorkspaceSelectionChange,
}: IBreadcrumbsProps) => {
  const hasAllWorkspacesOption = workspaces.some((workspace) => workspace.id === ALL_WORKSPACES_ID);
  const workspaceOptions =
    workspaces.length > 1 && !hasAllWorkspacesOption
      ? [{ id: ALL_WORKSPACES_ID, name: ALL_WORKSPACES_NAME }, ...workspaces]
      : workspaces;
  const hasOrganizations = organizations.length > 0;
  const hasWorkspaces = workspaceOptions.length > 0;
  const workspaceLabelName = hasWorkspaces ? workspaceOptions[0].name : DEFAULT_WORKSPACE_NAME;
  const showWorkspaceLabel = workspaceOptions.length <= 1;
  const hasWorkspaceSegment = true;
  const hasPrefixSegments = hasOrganizations || hasWorkspaceSegment;
  const showOrganizationLabel = organizations.length === 1;
  const workspaceSelection =
    selectedWorkspaceIds ?? (selectedWorkspaceId ? [selectedWorkspaceId] : undefined);
  const defaultWorkspaceSelection =
    defaultSelectedWorkspaceIds ?? (selectedWorkspaceId ? [selectedWorkspaceId] : undefined);
  const firstPage = pages[0];
  const lastPage = pages.length > 0 ? pages[pages.length - 1] : undefined;
  const middlePages = pages.slice(1, pages.length - 1);
  const showCollapsedPages = pages.length >= MANY_CRUMBS_THRESHOLD && middlePages.length > 0;

  return (
    <Flex align="center" gap="2">
      {showOrganizationLabel ? (
        <EntityLabel
          name={organizations[0].name}
          icon={<BuildingsIcon size={16} weight="bold" />}
        />
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
        <WorkspaceDropdown
          entities={workspaceOptions}
          disabled={disableWorkspacesDropdown}
          selectedIds={workspaceSelection}
          defaultSelectedIds={defaultWorkspaceSelection}
          onSelectionChange={onWorkspaceSelectionChange}
          onSingleSelect={onWorkspaceSelect}
        />
      ) : null}

      {showCollapsedPages && firstPage ? (
        <>
          <Flex display="inline-flex" gap="1" key={getPageKey(firstPage.link, 0)}>
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
                {middlePages.map((page, index) => (
                  <DropdownMenu.Item key={getPageKey(page.link, index + 1)} asChild>
                    <Link href={page.link}>{page.name}</Link>
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </Flex>

          {lastPage ? (
            <Flex display="inline-flex" gap="1" key={getPageKey(lastPage.link, pages.length - 1)}>
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
            <Flex display="inline-flex" gap="1" key={getPageKey(page.link, index)}>
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
