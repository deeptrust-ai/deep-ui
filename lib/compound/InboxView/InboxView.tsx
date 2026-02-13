import type { IInboxViewProps } from './InboxView.types';
import styles from './InboxView.module.css';
import ContentWrapper from '../../atom/ContentWrapper/ContentWrapper';
import { Box, Button, Flex, Heading, IconButton, Tabs, Text } from '@radix-ui/themes';
import { useState } from 'react';
import TimelineTranscript from './parts/TimelineTranscript';
import CallList from './parts/CallList';
import { SidebarSimpleIcon } from '@phosphor-icons/react';
import Users from './parts/Users';
import RiskAnalysis from './parts/RiskAnalysis';

const InboxView = (_props: IInboxViewProps) => {
  const [callListCollapsed, setCallListCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<'users' | 'risk-analysis'>('users');

  return (
    <Flex gap="3" width="100%">
      <ContentWrapper className={styles.inboxViewWrapper}>
        <Flex width="100%">
          {!callListCollapsed && <CallList />}

          <Box className={styles.alertDetails} py="4" px="4" flexShrink={'1'} flexGrow={'1'}>
            <Flex justify="between">
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

            <Tabs.Root
              value={activeTab}
              onValueChange={(value) => {
                if (value === activeTab) return;
                if (value === 'users' || value === 'risk-analysis') {
                  setActiveTab(value);
                }
              }}
            >
              <Tabs.List>
                <Tabs.Trigger value="users">Users</Tabs.Trigger>
                <Tabs.Trigger value="risk-analysis">Risk Analysis</Tabs.Trigger>
              </Tabs.List>
              <Box pt="3">
                <Users />
                <RiskAnalysis />
              </Box>
            </Tabs.Root>
          </Box>
        </Flex>
      </ContentWrapper>

      <ContentWrapper>
        <TimelineTranscript />
      </ContentWrapper>
    </Flex>
  );
};

export default InboxView;
export type { IInboxViewProps };
