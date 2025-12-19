import { Flex } from '@radix-ui/themes';
import { Avatar } from '../../atom';
import { Breadcrumbs } from '../../molecule';
import type { ITopbarProps } from './Topbar.types';

const Topbar = ({ breadcrumbs, organizations, userName, userPfp }: ITopbarProps) => {
  return (
    <Flex justify="between" align="center" p="4">
      <Breadcrumbs organizations={organizations} crumbs={breadcrumbs} />
      <Avatar name={userName} pfp={userPfp} />
    </Flex>
  );
};

export default Topbar;
