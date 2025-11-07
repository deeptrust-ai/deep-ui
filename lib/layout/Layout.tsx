import { Box, Flex, Grid } from '@radix-ui/themes';
import styles from './styles.module.css';
import { Sidebar as LayoutSidebar, Topbar } from '../compound';
import type { ILayoutComponent } from './types';

const Layout = ({ children, sidebar }: ILayoutComponent) => {
  const hasTwoColumns = !!sidebar;

  const splitRows = hasTwoColumns ? '1fr auto' : '1fr';

  return (
    <Grid columns="280px 1fr">
      <LayoutSidebar />

      <Flex direction="column">
        <Topbar
          userName="Chewbacca"
          organizations={[
            {
              name: 'Organization 1',
              selected: true,
            },
          ]}
        />

        <Box height="100%" px="4" mb="4">
          <Grid columns={splitRows} gap="4" width="auto" height="100%">
            <Box className={styles.contentContainer}>{children}</Box>
            {hasTwoColumns && <Box className={styles.contentContainer}>{sidebar}</Box>}
          </Grid>
        </Box>
      </Flex>
    </Grid>
  );
};

export default Layout;
