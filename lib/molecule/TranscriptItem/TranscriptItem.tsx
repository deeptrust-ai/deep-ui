import { Box, Card, Heading, Text } from '@radix-ui/themes';
import { Avatar } from '../../atom';
import type { ITranscriptItemProps } from './TranscriptItem.types';
// import styles from './TranscriptItem.module.css';

const TranscriptItem = () => {
  return (
    <Box py="1" px="2" asChild>
      <Card variant="surface">
        <Avatar pfp="https://i.pravatar.cc/150?img=1" name="Agent Avatar" />
        <Heading as="h5" size="3">
          Noah
        </Heading>
        <Text weight="light">[00:02] Sean Sun</Text>
        <Text as="p">Hello everyone, welcome to the meeting.</Text>
      </Card>
    </Box>
  );
};

export default TranscriptItem;
export type { ITranscriptItemProps };

// <Flex>
//   <Flex>
//     <Avatar pfp="https://i.pravatar.cc/150?img=1" name="Agent Avatar" />
//     <Box ml="2">
//       <Text weight="light">[00:02] Sean Sun</Text>
//       <Text>Test, test, wire transfer. Just need to confirm the wire transfer details.</Text>
//     </Box>
//   </Flex>
// </Flex>
