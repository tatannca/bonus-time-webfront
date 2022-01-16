import type { NextPage } from 'next';
import {
  Box,
  Button,
  Text,
  ThemingProps,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { useState } from 'react';

type PickType<T, K extends keyof T> = T[K];
type TimeStampButtonProps = {
  text: string;
  colorScheme?: PickType<ThemingProps, 'colorScheme'>;
};

export const TimeStampButton: NextPage<TimeStampButtonProps> = ({ text, colorScheme }) => {
  const [timeStamp, setTimeStamp] = useState<string | null>(null);
  const [editTimeStamp, setEditTimeStamp] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onTimeStamp = () => {
    const now = new Date();
    if (timeStamp) {
      onOpen();
    } else {
      setTimeStamp(format(now, 'HH:mm'));
    }
  };

  const onEditTimeStamp = () => {
    setTimeStamp(editTimeStamp);
    console.log('ここでapi叩いて保存');
    onClose();
  };

  return (
    <Box>
      <Text bg="blackAlpha.100" borderRadius="full" textAlign="center" mb={3}>
        {timeStamp || '--:--'}
      </Text>
      <Button onClick={onTimeStamp} colorScheme={colorScheme} borderRadius="full" shadow="base" h="100px" w="100px">
        {text}
      </Button>
      <Modal size={'xs'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>打刻編集</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input type="time" defaultValue={timeStamp ?? ''} onChange={(e) => setEditTimeStamp(e.target.value)} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              キャンセル
            </Button>
            <Button onClick={onEditTimeStamp} variant="ghost">
              保存
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
