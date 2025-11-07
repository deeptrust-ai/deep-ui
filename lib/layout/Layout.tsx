import { Box, Flex, Grid } from '@radix-ui/themes';
import styles from './styles.module.css';
import { Sidebar, Topbar } from '../compound';
import { ILayoutComponent } from './types';

const Layout = ({ children, columns }: ILayoutComponent) => {
  console.log('Layout columns:', columns);
  const hasTwoColumns = !!columns && columns.Content;

  const splitRows = hasTwoColumns ? (columns.split === 'half' ? '1fr 1fr' : '6fr 4fr') : '1fr';

  return (
    <Grid columns="280px 1fr">
      <Sidebar />

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
            {hasTwoColumns && <Box className={styles.contentContainer}>{columns.Content}</Box>}
          </Grid>
        </Box>
      </Flex>
    </Grid>
  );
};

export default Layout;
