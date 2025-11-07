import { Box, Flex, Grid } from '@radix-ui/themes';
import { Sidebar, Topbar } from '../compound';
import type { ReactNode } from 'react';

interface IOneColumnLayoutProps {
  readonly Content?: null;
  readonly split?: never;
}

interface ITwoColumnLayoutProps {
  readonly Content: ReactNode;
  readonly split: '50-50' | '30-70' | '70-30';
}

interface ILayoutComponent {
  readonly columns: IOneColumnLayoutProps | ITwoColumnLayoutProps;
  readonly children?: ReactNode;
}

const Layout = ({ children, columns }: ILayoutComponent) => {
  console.log('Layout columns:', columns);
  const hasTwoColumns = !!columns && columns.Content;

  const splitRows = hasTwoColumns
    ? columns.split === '50-50'
      ? '1fr 1fr'
      : columns.split === '30-70'
        ? '3fr 7fr'
        : '7fr 3fr'
    : '1fr';

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

        <Box height="100%" p="4">
          <Grid columns={splitRows} gap="2" width="auto" height="100%">
            <Box style={{ background: 'var(--gray-a2)', borderRadius: 'var(--radius-5)' }}>
              {children}
            </Box>
            {hasTwoColumns && (
              <Box style={{ background: 'var(--crimson-a2)', borderRadius: 'var(--radius-5)' }}>
                {columns.Content}
              </Box>
            )}
          </Grid>
        </Box>
      </Flex>
    </Grid>
  );
};

export default Layout;
