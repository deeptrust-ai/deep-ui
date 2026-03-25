import { Box, Flex, Grid } from '@radix-ui/themes';
import { Topbar } from '../compound';
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
}: ILayoutComponent) => {
  const contentColumns = sidebar ? '1fr 1fr' : '1fr';

  return (
    <Flex direction="column" height="100%" pb={'2'}>
      <Box flexShrink={'1'} style={{ zIndex: '1', position: 'sticky', top: 0 }}>
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
      </Box>

      <Flex flexGrow={'1'} px="4" pt={'4'}>
        <Grid columns={contentColumns} gap="2" height="100%" width={'100%'}>
          <Flex direction={'column'}>{children}</Flex>
          {sidebar}
        </Grid>
      </Flex>
    </Flex>
  );
};

export default Layout;
