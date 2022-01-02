import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Container, VStack, Input, InputGroup, Button, IconButton, InputRightElement, Heading } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { requestSignIn } from '../../store/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '../../firebase/config';
import { useState } from 'react';
import { useAppDispatch } from '../../store/hooks';

const SingUp: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pageBack = () => router.back();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  const login = () => {
    dispatch(requestSignIn({ firebaseAuth, email, password }));
    console.log('login');
    // signInWithEmailAndPassword(firebaseAuth, email, password)
    //   .then(async (res) => {
    //     const user = res.user;
    //     const token = await user.getIdToken();
    //     localStorage.setItem('access_token', token);
    //     console.log('user', user);
    //     console.log('token', token);
    //     router.push('/dashboard');
    //   })
    //   .catch((err) => {
    //     const errorCode = err.code;
    //     const errorMessage = err.message;
    //     console.log(errorCode, errorMessage);
    //   });
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
        <Button colorScheme="teal" onClick={login}>
          ログイン
        </Button>
      </VStack>
    </Container>
  );
};
export default SingUp;
