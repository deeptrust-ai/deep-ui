import { Box, Flex } from '@radix-ui/themes';
import { Sidebar as LayoutSidebar, Topbar } from '../compound';
import { Grid } from '../layout';
import type { ILayoutComponent } from './types';
import { ContentWrapper } from '../atom';

const Layout = ({ children, sidebar, menuPages, userName, organizations }: ILayoutComponent) => {
  const hasTwoColumns = !!sidebar;

  const splitRows = hasTwoColumns ? '1fr auto' : '1fr';

  return (
    <Grid columns="auto 1fr" height="100%">
      <LayoutSidebar menuPages={menuPages} />

      <Flex direction="column">
        <Topbar userName={userName} organizations={organizations} />

        <Box height="100%" px="4" mb="4">
          <Grid columns={splitRows} gap="4" height="100%">
            <ContentWrapper>{children}</ContentWrapper>
            {hasTwoColumns && <ContentWrapper>{sidebar}</ContentWrapper>}
          </Grid>
        </Box>
      </Flex>
    </Grid>
  );
};

export default Layout;
