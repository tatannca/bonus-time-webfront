import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Container, VStack, Input, InputGroup, InputRightElement, Button, IconButton, Heading } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { createUserWithEmailAndPassword, User } from 'firebase/auth';
import { firebaseAuth } from '../../firebase/config';
import { useEffect, useState } from 'react';
import { catchErrorAuth, signUpAuthStart, signUpAuthSucceed } from '../../store/auth';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const SingUp: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pageBack = () => router.back();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const authState = useAppSelector((state) => state.auth);

  const signUp = () => {
    dispatch(signUpAuthStart());
    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((res) => {
        const user = res.user;
        dispatch(signUpAuthSucceed({ user }));
      })
      .catch((err) => {
        if (err.code || err.message) {
          const { code, message } = err;
          dispatch(catchErrorAuth({ code, message }));
        } else {
          dispatch(catchErrorAuth(err));
        }
      });
  };

  // TODO: hookに切り出す
  const [user, setUser] = useState<User | null | undefined>(undefined);
  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, [router]);

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

  useEffect(() => {
    if (user && !authState.isCreatedUser) router.replace('/dashboard');
  }, [user, authState.isCreatedUser, router]);

  if (user === undefined || (user && !authState.isCreatedUser)) return <div>Loading...</div>;

  if (user && authState.isCreatedUser) return <div>サービスを使う!</div>;

  return (
    <Container>
      <IconButton as="a" my={3} aria-label="戻る" icon={<ChevronLeftIcon />} onClick={pageBack} />
      <VStack spacing={10}>
        <Heading as="h1">アカウント登録</Heading>
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
        <Button colorScheme="teal" onClick={signUp}>
          メールアドレスで登録
        </Button>
      </VStack>
    </Container>
  );
};
export default SingUp;
