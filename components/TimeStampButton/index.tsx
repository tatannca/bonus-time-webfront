import { NextPage } from 'next';
import { Box, Button, Text, ThemingProps } from '@chakra-ui/react';
import { format } from 'date-fns';

type PickType<T, K extends keyof T> = T[K];
type TimeStampButtonProps = {
  text: string;
  colorScheme?: PickType<ThemingProps, 'colorScheme'>;
};

export const TimeStampButton: NextPage<TimeStampButtonProps> = ({ text, colorScheme }) => {
  return (
    <Box>
      <Text textAlign="center" pb={3}>
        --:--
      </Text>
      <Button colorScheme={colorScheme} borderRadius="full" shadow="base" h="100px" w="100px">
        {text}
      </Button>
    </Box>
  );
};
