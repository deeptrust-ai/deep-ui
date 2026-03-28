import { Avatar as RadixAvatar, Flex, Text as RadixText } from '@radix-ui/themes';
import type { IUserProps } from './User.types';

export const User = ({ name, position, pictureSrc }: IUserProps) => {
  return (
    <Flex gap="3" align="center">
      <RadixAvatar
        radius="medium"
        fallback={name}
        src={pictureSrc}
        alt={pictureSrc ? `${name}'s Avatar` : undefined}
      />
      <Flex direction="column">
        <RadixText size="3">{name}</RadixText>
        <RadixText size="2" color="gray">
          {position}
        </RadixText>
      </Flex>
    </Flex>
  );
};

export default User;
export type { IUserProps };
