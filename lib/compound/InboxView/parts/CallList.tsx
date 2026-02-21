import { Text, Heading, Flex, HoverCard, Link, Box, Button } from '@radix-ui/themes';
import cn from 'classnames';

import styles from '../InboxView.module.css';
import { ArrowSquareOutIcon } from '@phosphor-icons/react';
import type { CallListItem } from '../InboxView.types';

const CallList = ({ calls }: { readonly calls?: Array<CallListItem> }) => {
  return (
    <Flex
      className={styles.recentAlerts}
      pb="4"
      minWidth={'250px'}
      maxWidth={'250px'}
      width={'250px'}
      gap="2"
      direction={'column'}
      overflowY={'auto'}
      overflowX="hidden"
      position={'relative'}
    >
      <Heading
        size="3"
        style={{
          position: 'sticky',
          top: 0,
          backgroundColor: 'var(--gray-1)',
          zIndex: 1,
          paddingTop: 'var(--space-4)',
          paddingBottom: 'var(--space-2)',
          boxShadow: 'inset 0 -1px 0 0 var(--gray-a4)',
          paddingInline: 'var(--space-4)',
          marginRight: '1px',
        }}
      >
        Call List
      </Heading>

      <Flex direction={'column'} gap="2" px="4">
        {calls?.map((item) => (
          <Flex
            key={item.id}
            className={cn(styles.callListItem, {
              [styles.callListItemSelected]: item.active,
            })}
            p="3"
            gap="1"
            direction={'column'}
            aria-description={item.read ? 'New Message' : undefined}
            asChild
          >
            <Button variant="outline">
              <Flex justify={'between'} align="center" className={styles.callListItemHeading}>
                <Box asChild maxWidth={'80%'}>
                  <Heading size="2" truncate>
                    {item.label}
                  </Heading>
                </Box>
                {!item.read && <Box className={styles.newMessageBadge} />}
              </Flex>
              <Text as="p" size={'2'} color="gray">
                {item.startTime}
              </Text>

              <Text as="p" size="1" color="gray">
                <Text weight="bold" mr="1">
                  Violation:{' '}
                </Text>
                <HoverCard.Root>
                  <HoverCard.Trigger>
                    <Text color="red" style={{ borderBottom: '1px dashed red', cursor: 'help' }}>
                      SOP-007
                    </Text>
                  </HoverCard.Trigger>
                  <HoverCard.Content maxWidth="300px">
                    <Heading size="3" mb="2">
                      SOP-007
                    </Heading>
                    <Text size="2" as="p">
                      This is where the description of the violation would go. It would explain what
                      the violation is, why it is a violation, and any other relevant information
                      that would help the user understand the violation and how to avoid it in the
                      future.
                    </Text>

                    <Text size="2" as="p" align="right" mt="2">
                      <Link href="/settings/sop">
                        More Information <ArrowSquareOutIcon />
                      </Link>
                    </Text>
                  </HoverCard.Content>
                </HoverCard.Root>
              </Text>
            </Button>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default CallList;
