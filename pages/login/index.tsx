import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Container, VStack, Input, InputGroup, Button, IconButton, InputRightElement, Heading } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { requestSignIn, updateUser } from '../../store/auth';
import { firebaseAuth } from '../../firebase/config';
import { useState } from 'react';
import { useAppDispatch, useAuthState } from '../../store/hooks';
import { OnlyPublicRoute } from '../../components/Auth';

const SingUp: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pageBack = () => router.back();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const { AuthState } = useAuthState();

  const login = () => {
    dispatch(requestSignIn({ firebaseAuth, email, password }))
      .then(() => {
        router.replace('/dashboard');
      })
      .catch(() => {
        dispatch(updateUser({ user: null }));
      });
  };

  return (
    <OnlyPublicRoute>
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
          <Button colorScheme="teal" onClick={login} isLoading={AuthState.isLoading}>
            ログイン
          </Button>
        </VStack>
      </Container>
    </OnlyPublicRoute>
  );
};
export default SingUp;
