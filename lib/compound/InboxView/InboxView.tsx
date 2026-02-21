import type { IInboxViewProps } from './InboxView.types';
import styles from './InboxView.module.css';
import ContentWrapper from '../../atom/ContentWrapper/ContentWrapper';
import { Box, Button, Flex, Heading, IconButton, Text } from '@radix-ui/themes';
import { useState } from 'react';
import CallList from './parts/CallList';
import { SidebarSimpleIcon } from '@phosphor-icons/react';

const InboxView = ({ content, callList }: IInboxViewProps) => {
  const [callListCollapsed, setCallListCollapsed] = useState(false);

  return (
    <ContentWrapper className={styles.inboxViewWrapper} overflow={'hidden'} height="100%">
      <Flex width="100%" height="100%">
        {!callListCollapsed && <CallList calls={callList} />}

        <Flex
          pb="4"
          minWidth={'250px'}
          gap="2"
          direction={'column'}
          position={'relative'}
          flexGrow={'1'}
          overflowY="scroll"
          overflowX="hidden"
        >
          <Flex
            justify="between"
            position="sticky"
            top={'0'}
            pt="4"
            px="4"
            pb="2"
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
            <Flex gap="2">
              <IconButton
                variant="ghost"
                size="2"
                color="gray"
                mt="1"
                onClick={() => {
                  setCallListCollapsed((prev) => !prev);
                }}
              >
                <SidebarSimpleIcon weight="bold" size={20} aria-label="Toggle Call List" />
              </IconButton>
              <Box>
                <Text size="2" color="gray">
                  January 1, 2024 at 12:00 AM
                </Text>
                <Heading size="6" mt="1">
                  New Year Sync
                </Heading>
              </Box>
            </Flex>
            <Box>
              <Button variant="outline" size="2" color="blue" mr="2">
                Join Meeting
              </Button>
              <Button variant="outline" size="2" color="red">
                Remove Agent
              </Button>
            </Box>
          </Flex>

          <Box px="4">{content}</Box>
        </Flex>
      </Flex>
    </ContentWrapper>
  );
};

export default InboxView;
export type { IInboxViewProps };
