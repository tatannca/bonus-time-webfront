import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Container, VStack, Input, InputGroup, Button, IconButton, InputRightElement, Heading } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { requestSignIn } from '../../store/auth';
import { firebaseAuth } from '../../firebase/config';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { User } from 'firebase/auth';
import { Loading } from '../../components/Loading';

const SingUp: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pageBack = () => router.back();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const authState = useAppSelector((state) => state.auth);

  // TODO: hookに切り出す
  const [user, setUser] = useState<User | null | undefined>(undefined);
  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        localStorage.setItem('access_token', token);
        router.replace('/dashboard');
      } else {
        setUser(user);
      }
    });
    return () => unsubscribe();
  }, [router, user]);

  const login = async () => {
    await dispatch(requestSignIn({ firebaseAuth, email, password }));
    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        localStorage.setItem('access_token', token);
        router.replace('/dashboard');
      } else {
        setUser(user);
      }
    });
  };

  // const apiTest = () => {
  //   axios
  //     .get('http://localhost:8080/api/v1/public')
  //     .then((res) => {
  //       console.log(res.data)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }

  if (user || user === undefined) return <Loading />;

  return (
    <Container>
      <IconButton as="a" my={3} aria-label="戻る" icon={<ChevronLeftIcon />} onClick={pageBack} />
      <VStack spacing={10}>
        <Heading as="h1">ログイン</Heading>
        <VStack spacing={5} w="100%">
          <Input placeholder="メールアドレス" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <InputGroup>
            <Input
              placeholder="パスワード"
              type={showPass ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement w="4.5rem">
              <Button h="1.75rem" size="sm" onClick={() => setShowPass((prev) => !prev)}>
                {showPass ? '非表示' : '表示'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </VStack>
        <Button colorScheme="teal" onClick={login} isLoading={authState.isLoading}>
          ログイン
        </Button>
      </VStack>
    </Container>
  );
};
export default SingUp;
