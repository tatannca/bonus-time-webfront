import type { NextPage } from 'next';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { Box, Button, Text, Link, Center } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPrivateMessage, getPublicMessage } from '../store/utils';
import { useUtilsState } from '../store/hooks';

const Home: NextPage = () => {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    const handleResize = () => setHeight(window.innerHeight);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { UtilsState } = useUtilsState();

  // TODO: レスポンステストができたら消す
  const dispatch = useDispatch();
  const responseTestPublic = () => dispatch(getPublicMessage());
  const responseTestPrivate = () => dispatch(getPrivateMessage());

  if (height === 0) return <></>;

  return (
    <Center h={height}>
      <Box textAlign="center">
        <Box>
          <NextImage src="/logo_bonus-time.png" width={200} height={200} alt="BONUS TIME" />
        </Box>
        <NextLink href="/login" passHref>
          <Button as="a" colorScheme="teal" mt={2}>
            ログイン
          </Button>
        </NextLink>
        <Text textAlign="center" pt={4}>
          新規アカウント登録は
          <NextLink href="/signup" passHref>
            <Link color="teal.500">こちら</Link>
          </NextLink>
        </Text>

        {/* TODO: レスポンステストができたら消す */}
        <Center textAlign="center">
          <Box pt={5}>
            <Button onClick={responseTestPublic}>Response TEST (Public)</Button>
            <Text pt={2} textAlign="center">
              {UtilsState.publicMessage}
            </Text>
            <Button onClick={responseTestPrivate}>Response TEST (Private)</Button>
            <Text pt={2} textAlign="center">
              {UtilsState.privateMessage}
              {UtilsState.utilsError?.err}
            </Text>
          </Box>
        </Center>
      </Box>
    </Center>
  );
};

export default Home;
