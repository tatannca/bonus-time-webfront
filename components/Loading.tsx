import type { NextPage } from 'next';
import { VStack, Spinner, Text } from '@chakra-ui/react';

export const Loading: NextPage = () => {
  return (
    <VStack pt={20}>
      <Spinner color="teal" size="xl" />
      <Text pt="4" fontWeight="bold">
        Loading
      </Text>
    </VStack>
  );
};
