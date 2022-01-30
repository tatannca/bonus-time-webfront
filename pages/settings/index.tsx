import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Container, Button, Center } from '@chakra-ui/react';
import { firebaseAuth } from '../../firebase/config';
import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { useAppDispatch } from '../../store/hooks';
import { requestSignOut } from '../../store/auth';

const Settings: NextPage = () => {
  const dispatch = useAppDispatch();
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

  const logout = () => {
    dispatch(requestSignOut()).then(() => {
      router.push('/');
    });
  };

  if (!user) return <></>;

  return (
    <>
      <Container>
        <Center pt="10">
          <Button onClick={logout}>ログアウト</Button>
        </Center>
      </Container>
    </>
  );
};
export default Settings;
