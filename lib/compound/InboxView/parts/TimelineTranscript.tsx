import { Heading, Flex, Box, Text } from '@radix-ui/themes';
import Avatar from '../../../atom/Avatar/Avatar';

const TimelineTranscript = () => {
  return (
    <>
      <Heading size="2">Call Timeline & Transcript</Heading>
      <Flex>
        <Flex>
          <Avatar pfp="https://i.pravatar.cc/150?img=1" name="Agent Avatar" />
          <Box ml="2">
            <Text weight="light">[00:02] Sean Sun</Text>
            <Text>Test, test, wire transfer. Just need to confirm the wire transfer details.</Text>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default TimelineTranscript;
