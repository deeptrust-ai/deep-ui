import { Box, Flex, Grid } from '@radix-ui/themes';
import { Topbar } from '../compound';
import { ContentWrapper } from '../atom';
import type { ILayoutComponent } from './types';

const Layout = ({
  children,
  sidebar,
  userName,
  organizations,
  workspaces = [],
  links = [],
  pages = [],
  disableOrganizationsDropdown = false,
  disableWorkspacesDropdown = false,
  selectedOrganizationId,
  selectedWorkspaceIds,
  defaultSelectedWorkspaceIds,
  onOrganizationSelect,
  onWorkspaceSelectionChange,
  userPfp,
  userMenuItems = [],
  logout,
  title,
  subtitle,
  metaInfo,
  wrapContent = true,
  sidebarExpanded = false,
}: ILayoutComponent) => {
  const hasTwoColumns = !!sidebar;
  const contentColumns = hasTwoColumns && !sidebarExpanded ? '1fr auto' : '1fr';

  const mainContent = wrapContent ? (
    <ContentWrapper title={title} subtitle={subtitle} metaInfo={metaInfo}>
      {children}
    </ContentWrapper>
  ) : (
    <Box height="100%">{children}</Box>
  );

  const sidebarContent = !hasTwoColumns
    ? null
    : wrapContent
      ? (
          <ContentWrapper>{sidebar}</ContentWrapper>
        )
      : (
          <Box height="100%">{sidebar}</Box>
        );

  return (
    <Flex direction="column" height="100%">
      <Topbar
        userName={userName}
        userPfp={userPfp}
        organizations={organizations}
        workspaces={workspaces}
        pages={pages}
        disableOrganizationsDropdown={disableOrganizationsDropdown}
        disableWorkspacesDropdown={disableWorkspacesDropdown}
        selectedOrganizationId={selectedOrganizationId}
        selectedWorkspaceIds={selectedWorkspaceIds}
        defaultSelectedWorkspaceIds={defaultSelectedWorkspaceIds}
        onOrganizationSelect={onOrganizationSelect}
        onWorkspaceSelectionChange={onWorkspaceSelectionChange}
        links={links}
        userMenuItems={userMenuItems}
        logout={logout}
      />

      <Box height="100%" px="4" mb="4">
        <Grid columns={contentColumns} gap="4" height="100%">
          <Box height="100%" display={hasTwoColumns && sidebarExpanded ? 'none' : 'block'}>
            {mainContent}
          </Box>
          {sidebarContent}
        </Grid>
      </Box>
    </Flex>
  );
};

export default Layout;
