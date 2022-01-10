import type { NextPage } from 'next';
import NextLink from 'next/link';
import { Container, Text, Flex, Spacer, IconButton, Box, VStack, Center } from '@chakra-ui/react';
import { SettingsIcon, InfoIcon } from '@chakra-ui/icons';
import { firebaseAuth } from '../../firebase/config';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { User } from 'firebase/auth';
import { format } from 'date-fns';
import Lottie from 'lottie-web';
import animationData from '../../public/57820-cute-monster.json';

const Dashboard: NextPage = () => {
  const router = useRouter();

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

  const now = new Date();
  const [today, setToday] = useState(format(now, 'yyyy年MM年dd日(E)'));
  const [currentTime, setCurrentTime] = useState(format(now, 'hh:mm'));
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

  if (!user) return <></>;

  return (
    <>
      <Container>
        <Flex align="center" py={3}>
          <InfoIcon color="teal" />
          <Text pl={2}>UserName</Text>
          <Spacer />
          <NextLink href="/settings" passHref>
            <IconButton as="a" href="/" aria-label="設定" icon={<SettingsIcon />} />
          </NextLink>
        </Flex>
        <Center>
          <Box>
            <Flex alignItems="baseline" justifyContent="center">
              <Text style={{ fontFeatureSettings: 'thum', fontVariantNumeric: 'tabular-nums' }} fontSize="5xl">
                {currentTime}
              </Text>
              <Text style={{ fontFeatureSettings: 'thum', fontVariantNumeric: 'tabular-nums' }} pl="1">
                {currentSeconds}
              </Text>
            </Flex>
            <Text textAlign="center">{today}</Text>
          </Box>
        </Center>
        <VStack>
          <Box w="200px" ref={LottieRef} />
        </VStack>
      </Container>
    </>
  );
};
export default Dashboard;
