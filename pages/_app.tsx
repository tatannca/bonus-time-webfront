import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { store } from '../store';
import { Provider } from 'react-redux';
import { firebaseAuth } from '../firebase/config';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // JWT更新監視
    firebaseAuth.onIdTokenChanged(async (user) => {
      if (!user) {
        window.localStorage.removeItem('access_token');
      } else {
        const token = await user.getIdToken();
        window.localStorage.setItem('access_token', token);
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
