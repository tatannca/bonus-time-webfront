import type { NextPage } from 'next';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { Box, Button, Text, Link, Center } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Home: NextPage = () => {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    const handleResize = () => setHeight(window.innerHeight);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // TODO: レスポンステストができたら消す
  type testRestType = {
    message: string;
  };
  const [testResPublic, setTestResPublic] = useState<testRestType>();
  const [testResPrivate, setTestResPrivate] = useState<testRestType>();
  const responseTestPublic = async () => {
    const res = await axios.get('http://localhost:5000/public');
    const data: testRestType = res.data;
    setTestResPublic(data);
  };
  const responseTestPrivate = async () => {
    const token = window.localStorage.getItem('access_token');
    const res = await axios.get('http://localhost:5000/private', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data: testRestType = res.data;
    setTestResPrivate(data);
  };

  if (height === 0) return <></>;

  return (
    <Center h={height}>
      <Box textAlign="center">
        <div>
          <NextImage src="/logo_bonus-time.png" width={200} height={200} alt="BONUS TIME" />
        </div>
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
              {testResPublic?.message}
            </Text>
            <Button onClick={responseTestPrivate}>Response TEST (Private)</Button>
            <Text pt={2} textAlign="center">
              {testResPrivate?.message}
            </Text>
          </Box>
        </Center>
      </Box>
    </Center>
  );
};

export default Home;
