import { Text as RadixText, Heading as RadixHeading, Separator } from '@radix-ui/themes';
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
    <>
      <Flex direction="column" gap="1" px="5" py="4">
        {metaInfo && (
          <RadixText size="2" color="gray" as="p">
            {metaInfo}
          </RadixText>
        )}
        <RadixHeading size={headerSize} as={headerAs}>
          {title}
        </RadixHeading>
        {subtitle && (
          <RadixText size="2" color="gray" as="p">
            {subtitle}
          </RadixText>
        )}
      </Flex>
      <Separator color="gray" orientation="horizontal" size="4" />
    </>
  );
};

export default Header;
export type { IHeaderProps } from './Header.types';
