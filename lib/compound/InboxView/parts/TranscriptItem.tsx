import { Box, Card, Flex, Text } from '@radix-ui/themes';
import { Avatar } from '../../../atom';
// import styles from '../InboxView.module.css';

const TranscriptItem = () => {
  return (
    <Card variant="ghost">
      <Flex direction="row" gap="3" py="1" px="2">
        <Avatar pfp="https://i.pravatar.cc/150?img=1" name="Agent Avatar" size="1" />
        <Box>
          <Text size="2" weight="light">
            [00:02] Noah
          </Text>
          <Text size="3" as="p" weight="medium">
            Hello everyone, welcome to the meeting.
          </Text>
        </Box>
      </Flex>
    </Card>
  );
};

export default TranscriptItem;
