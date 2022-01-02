import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Container, Button } from '@chakra-ui/react';
import { firebaseAuth } from '../../firebase/config';
import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';

const Settings: NextPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
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
        router.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!user) return <div>Loading...</div>;

  return (
    <>
      <Container>
        <Button onClick={logout}>ログアウト</Button>
      </Container>
    </>
  );
};
export default Settings;
