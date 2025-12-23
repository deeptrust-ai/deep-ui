import type { IAttendeeBadgeProps } from './AttendeeBadge.types';
import { Badge, Flex, Text } from '@radix-ui/themes';
import type { PropsWithChildren } from 'react';
import Chip from '../../atom/Chip/Chip';

const AttendeeBadge = ({
  children,
  chip,
  icon: Icon,
  ...rest
}: PropsWithChildren<IAttendeeBadgeProps>) => {
  return (
    <Flex display="inline-flex" align="center" gap="2" py="2" px="3" asChild>
      <Badge color="gray" variant="surface" radius="large" {...rest}>
        {Icon && <Icon weight="bold" size="16px" />}
        <Text size="1">{children}</Text>
        {chip && <Chip text={chip} />}
      </Badge>
    </Flex>
  );
};

export default AttendeeBadge;
export type { IAttendeeBadgeProps };
