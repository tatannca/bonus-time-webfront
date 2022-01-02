import type { NextPage } from 'next';
import NextLink from 'next/link';
import { Container, Text, Flex, Spacer, IconButton } from '@chakra-ui/react';
import { SettingsIcon, InfoIcon } from '@chakra-ui/icons';
import { firebaseAuth } from '../../firebase/config';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { User } from 'firebase/auth';

const Dashboard: NextPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      if (!user) router.push('/');
      setUser(user);
    });
    return () => unsubscribe();
  }, [router]);

  if (!user) return <div>Loading...</div>;

  return (
    <>
      <Container>
        <Flex align="center" py={3}>
          <InfoIcon color="teal" />
          <Text pl={2}>UserName Rank:シルバー</Text>
          <Spacer />
          <NextLink href="/settings" passHref>
            <IconButton as="a" href="/" aria-label="設定" icon={<SettingsIcon />} />
          </NextLink>
        </Flex>
      </Container>
    </>
  );
};
export default Dashboard;
