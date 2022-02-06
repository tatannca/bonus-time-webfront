import type { NextPage } from 'next';
import NextLink from 'next/link';
import {
  Container,
  Text,
  Flex,
  Spacer,
  IconButton,
  Box,
  VStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  InputGroup,
  InputRightAddon,
  Input,
  Center
} from '@chakra-ui/react';
import { SettingsIcon, InfoIcon } from '@chakra-ui/icons';
import { useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import Lottie from 'lottie-web';
import animationData from '../../public/57820-cute-monster.json';
import { TimeStampButton } from '../../components/TimeStampButton';
import { PrivateRoute } from '../../components/Auth';
import { useAuthState, useUtilsState } from '../../store/hooks';
import { useDispatch } from 'react-redux';
import { getPrivateMessage, getPublicMessage } from '../../store/utils';

const Dashboard: NextPage = () => {
  const [restTime, setRestTime] = useState('');
  const [editRestTime, setEditRestTime] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { AuthState } = useAuthState();

  const onEditRestTime = () => {
    console.log('ここでapi叩いて保存');
    setRestTime(editRestTime);
    onClose();
  };

  const now = new Date();
  const [today, setToday] = useState(format(now, 'yyyy年MM年dd日(E)'));
  const [currentTime, setCurrentTime] = useState(format(now, 'HH:mm'));
  const [currentSeconds, setCurrentSeconds] = useState(format(now, 'ss'));
  useEffect(() => {
    const id = setInterval(() => {
      const now = new Date();
      setToday(format(now, 'yyyy年MM年dd日(E)'));
      setCurrentTime(format(now, 'HH:mm'));
      setCurrentSeconds(format(now, 'ss'));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const LottieRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (LottieRef.current) {
      Lottie.loadAnimation({
        container: LottieRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData
      });
    }
    // userのステートがないとページがレンダリングされずLottieRefが参照できないため、
    // 依存配列にAuthState.currentUserを入れている
  }, [LottieRef, AuthState.currentUser]);

  // TODO: レスポンステストができたら消す
  const dispatch = useDispatch();
  const responseTestPublic = () => dispatch(getPublicMessage());
  const responseTestPrivate = () => dispatch(getPrivateMessage());

  const { UtilsState } = useUtilsState();

  return (
    <PrivateRoute>
      <Container pb="10">
        {/* TODO: レスポンステストができたら消す */}
        <Center textAlign="center">
          <Box pt={5}>
            <Button onClick={responseTestPublic}>Response TEST (Public)</Button>
            <Text pt={2} textAlign="center">
              {UtilsState && UtilsState.publicMessage}
            </Text>
            <Button onClick={responseTestPrivate}>Response TEST (Private)</Button>
            <Text pt={2} textAlign="center">
              {UtilsState && UtilsState.privateMessage}
              {UtilsState && UtilsState.utilsError?.err}
            </Text>
          </Box>
        </Center>

        <Flex align="center" py={3}>
          <InfoIcon color="teal" />
          <Text pl={2}>{AuthState.currentUser ? AuthState.currentUser.email : 'Guest'}</Text>
          <Spacer />
          <NextLink href="/settings" passHref>
            <IconButton as="a" href="/" aria-label="設定" icon={<SettingsIcon />} />
          </NextLink>
        </Flex>
        <Box>
          <Flex alignItems="baseline" justifyContent="center">
            <Text style={{ fontFeatureSettings: 'thum', fontVariantNumeric: 'tabular-nums' }} fontSize="5xl">
              {currentTime}
            </Text>
            <Text style={{ fontFeatureSettings: 'thum', fontVariantNumeric: 'tabular-nums' }} pl="1">
              {currentSeconds}
            </Text>
          </Flex>
          <Text pb="4" textAlign="center">
            {today}
          </Text>
        </Box>
        <VStack>
          <Box w="200px" ref={LottieRef} />
          <Flex>
            <TimeStampButton text="出勤" colorScheme="teal" />
            <Spacer w={10} />
            <TimeStampButton text="退勤" />
          </Flex>
          <Flex pt={5}>
            <Box>
              <Button onClick={onOpen}>休憩時間</Button>
            </Box>
            <Spacer w={5} />
            <NextLink href="/attendance" passHref>
              <Button as="a">勤怠一覧</Button>
            </NextLink>
          </Flex>
        </VStack>

        <Modal size={'xs'} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>休憩時間</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <InputGroup>
                <Input
                  type="number"
                  placeholder="分単位で入力してください"
                  defaultValue={restTime}
                  onChange={(e) => setEditRestTime(e.target.value)}
                />
                <InputRightAddon>分</InputRightAddon>
              </InputGroup>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                キャンセル
              </Button>
              <Button onClick={onEditRestTime} variant="ghost">
                保存
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Container>
    </PrivateRoute>
  );
};
export default Dashboard;
