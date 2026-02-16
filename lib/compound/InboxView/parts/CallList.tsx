import { Text, Heading, Flex, HoverCard, Link, Box } from '@radix-ui/themes';
import cn from 'classnames';

import styles from '../InboxView.module.css';
import { ArrowSquareOutIcon } from '@phosphor-icons/react';

const CallList = ({ selectedCallID }: { readonly selectedCallID?: string }) => {
  const items = Array.from({ length: 26 }, (_, index) => ({
    id: `call-list-item-${index}`,
    // Deterministic flags to keep render pure and lint-friendly.
    isNewMessage: index % 4 === 0,
    isSelected: `call-list-item-${index}` === selectedCallID,
  }));

  return (
    <Flex
      className={styles.recentAlerts}
      pb="4"
      minWidth={'250px'}
      gap="2"
      direction={'column'}
      overflowY={'auto'}
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
        {items.map((item) => (
          <Flex
            key={item.id}
            className={cn(styles.callListItem, {
              [styles.callListItemSelected]: item.isSelected,
            })}
            p="3"
            gap="1"
            direction={'column'}
            aria-description={item.isNewMessage ? 'New Message' : undefined}
          >
            <Flex justify={'between'} align="center">
              <Heading size="2">New Year Sync</Heading>
              {item.isNewMessage && <Box className={styles.newMessageBadge} />}
            </Flex>
            <Text as="p" size={'2'}>
              January 1, 2024 at 12:00 AM
            </Text>

            <Text as="p" size="1">
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
                    the violation is, why it is a violation, and any other relevant information that
                    would help the user understand the violation and how to avoid it in the future.
                  </Text>

                  <Text size="2" as="p" align="right" mt="2">
                    <Link href="/settings/sop">
                      More Information <ArrowSquareOutIcon />
                    </Link>
                  </Text>
                </HoverCard.Content>
              </HoverCard.Root>
            </Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default CallList;
