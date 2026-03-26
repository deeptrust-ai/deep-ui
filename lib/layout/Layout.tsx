import { Flex, Grid } from '@radix-ui/themes';
import { Topbar } from '../compound';
import type { ILayoutComponent } from './types';

const Layout = ({
  children,
  topContent,
  hasTopContent = false,
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
}: ILayoutComponent) => {
  const contentColumns = sidebar ? '1fr 1fr' : '1fr';

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

      <Flex direction="column" flexGrow="1" px="4" pt="4" minHeight="0">
        {topContent ? (
          <Flex flexShrink="0" pb={hasTopContent ? '2' : '0'}>
            {topContent}
          </Flex>
        ) : null}
        <Grid columns={contentColumns} gap="2" width="100%" flexGrow="1" minHeight="0">
          <Flex direction="column">{children}</Flex>
          {sidebar}
        </Grid>
      </Flex>
    </Flex>
  );
};

export default Layout;
