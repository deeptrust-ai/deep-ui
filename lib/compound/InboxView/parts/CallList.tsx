import { Text, Box, Heading, Flex, HoverCard, Link } from '@radix-ui/themes';

import styles from '../InboxView.module.css';
import { ArrowSquareOutIcon } from '@phosphor-icons/react';

const CallList = () => {
  return (
    <Flex
      className={styles.recentAlerts}
      py="5"
      px="4"
      width={'250px'}
      gap="2"
      direction={'column'}
    >
      <Heading size="3">Call List</Heading>

      <Flex direction={'column'}>
        {/* loop through 10 times to mock out the data */}
        {[...Array(10)].map(() => (
          <Flex className={styles.callListItem} p="3" gap="1" direction={'column'}>
            <Heading size="2">New Year Sync</Heading>
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
