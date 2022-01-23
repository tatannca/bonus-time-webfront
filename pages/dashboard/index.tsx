import type { NextPage } from 'next';
import NextLink from 'next/link';
import axios from 'axios';
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
import { firebaseAuth } from '../../firebase/config';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { User } from 'firebase/auth';
import { format } from 'date-fns';
import Lottie from 'lottie-web';
import animationData from '../../public/57820-cute-monster.json';
import { TimeStampButton } from '../../components/TimeStampButton';

const Dashboard: NextPage = () => {
  const router = useRouter();
  const [restTime, setRestTime] = useState('');
  const [editRestTime, setEditRestTime] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onEditRestTime = () => {
    console.log('ここでapi叩いて保存');
    setRestTime(editRestTime);
    onClose();
  };

  // TODO: hookに切り出す
  const [user, setUser] = useState<User | null | undefined>(undefined);
  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/');
      } else {
        setUser(user);
      }
    });
    return () => unsubscribe();
  }, [router]);

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
  }, [LottieRef, user]);

  // TODO: レスポンステストができたら消す
  type testRestType = {
    message: string;
  };
  type ResponseError = {
    response: {
      data: {
        Message: {
          ErrorCode: string;
        };
      };
    };
  };
  // https://api-bonus-time.onrender.com
  // http://localhost:5000/
  const [testResPublic, setTestResPublic] = useState<testRestType>();
  const [testResPrivate, setTestResPrivate] = useState<string>();
  const responseTestPublic = async () => {
    const res = await axios.get(`https://api-bonus-time.onrender.com/public`);
    const data: testRestType = res.data;
    setTestResPublic(data);
  };
  const responseTestPrivate = async () => {
    const token = window.localStorage.getItem('access_token');
    try {
      const res = await axios.get(`https://api-bonus-time.onrender.com/private`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data: testRestType = res.data;
      setTestResPrivate(data.message);
    } catch (err) {
      const { response } = err as ResponseError;
      const data = response.data.Message.ErrorCode;
      setTestResPrivate(data);
    }
  };

  if (!user) return <></>;

  return (
    <>
      <Container pb="10">
        {/* TODO: レスポンステストができたら消す */}
        <Center textAlign="center">
          <Box pt={5}>
            <Button onClick={responseTestPublic}>Response TEST (Public)</Button>
            <Text pt={2} textAlign="center">
              {testResPublic?.message}
            </Text>
            <Button onClick={responseTestPrivate}>Response TEST (Private)</Button>
            <Text pt={2} textAlign="center">
              {testResPrivate}
            </Text>
          </Box>
        </Center>

        <Flex align="center" py={3}>
          <InfoIcon color="teal" />
          <Text pl={2}>UserName</Text>
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
    </>
  );
};
export default Dashboard;
