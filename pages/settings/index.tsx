import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Container, Button, Center } from '@chakra-ui/react';
import { useAppDispatch } from '../../store/hooks';
import { requestSignOut } from '../../store/auth';
import { PrivateRoute } from '../../components/Auth';

const Settings: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const logout = () => {
    dispatch(requestSignOut()).then(() => {
      router.push('/');
    });
  };

  return (
    <PrivateRoute>
      <Container>
        <Center pt="10">
          <Button onClick={logout}>ログアウト</Button>
        </Center>
      </Container>
    </PrivateRoute>
  );
};
export default Settings;
