import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { store } from '../store';
import { Provider, useDispatch } from 'react-redux';
import { firebaseAuth } from '../firebase/config';
import { useEffect } from 'react';
import { resetAuth, updateToken } from '../store/auth';

function MyApp({ Component, pageProps }: AppProps) {
  // const dispatch = useDispatch();

  useEffect(() => {
    // JWT更新監視
    firebaseAuth.onIdTokenChanged(async (user) => {
      if (!user) {
        // dispatch(resetAuth());
        window.localStorage.removeItem('access_token');
      } else {
        const token = await user.getIdToken();
        window.localStorage.setItem('access_token', token);
        // dispatch(updateToken({ user }));
      }
    });
  }, []);

  return (
    <Provider store={store}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
