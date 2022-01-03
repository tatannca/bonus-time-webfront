import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Container, Button } from '@chakra-ui/react';
import { firebaseAuth } from '../../firebase/config';
import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { useAppDispatch } from '../../store/hooks';
import { resetAuth } from '../../store/auth';
import { Loading } from '../../components/Loading';

const Settings: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  // TODO: hookに切り出す
  const [user, setUser] = useState<User | null | undefined>(undefined);
  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      if (!user) router.push('/');
      setUser(user);
    });
    return () => unsubscribe();
  }, [router]);

  const logout = () => {
    firebaseAuth
      .signOut()
      .then(() => {
        localStorage.removeItem('access_token');
        dispatch(resetAuth());
        router.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (user === undefined) return <Loading />;

  return (
    <>
      <Container>
        <Button onClick={logout}>ログアウト</Button>
      </Container>
    </>
  );
};
export default Settings;
