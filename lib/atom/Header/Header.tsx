import { Text as FrostedText, Heading as FrostedHeading } from 'frosted-ui';
import { Flex } from '@radix-ui/themes';
import type { IHeaderProps } from './Header.types';

export const Header = ({
  title,
  subtitle,
  metaInfo,
  headerAs = 'h1',
  headerSize = '6',
}: IHeaderProps) => {
  return (
    <Flex direction="column" gap="1">
      {metaInfo && (
        <FrostedText size="2" color="gray" as="p">
          {metaInfo}
        </FrostedText>
      )}
      <FrostedHeading size={headerSize} as={headerAs}>
        {title}
      </FrostedHeading>
      {subtitle && (
        <FrostedText size="2" color="gray" as="p">
          {subtitle}
        </FrostedText>
      )}
    </Flex>
  );
};

export default Header;
export type { IHeaderProps } from './Header.types';
