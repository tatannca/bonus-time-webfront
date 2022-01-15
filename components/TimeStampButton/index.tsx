import { NextPage } from 'next';
import { Box, Button, Flex, Text } from '@chakra-ui/react';

export const TimeStampButton: NextPage = () => {
  return (
    <Flex>
      <Box>
        <Text textAlign="center" pb={3}>
          --:--
        </Text>
        <Button colorScheme="teal" borderRadius="full" shadow="base" h="100px" w="100px">
          出勤
        </Button>
      </Box>
      <Box ml="10">
        <Text textAlign="center" pb={3}>
          --:--
        </Text>
        <Button borderRadius="full" shadow="base" h="100px" w="100px">
          退勤
        </Button>
      </Box>
    </Flex>
  );
};
