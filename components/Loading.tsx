import { VStack, Spinner, Text } from '@chakra-ui/react';
import { FC } from 'react';

export const Loading: FC = () => {
  return (
    <VStack pt={20}>
      <Spinner color="teal" size="xl" />
      <Text pt="4" fontWeight="bold">
        Loading
      </Text>
    </VStack>
  );
};
