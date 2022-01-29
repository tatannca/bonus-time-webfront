import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { store } from '../store';
import { Provider } from 'react-redux';
// import { firebaseAuth } from '../firebase/config';
import { useEffect } from 'react';
import { getAuth, onIdTokenChanged } from 'firebase/auth';

function MyApp({ Component, pageProps }: AppProps) {
  // JWT更新監視
  useEffect(() => {
    const auth = getAuth();
    onIdTokenChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        window.localStorage.setItem('access_token', token);
        console.log('change token', new Date());
        console.log(token);
      } else {
        window.localStorage.removeItem('access_token');
      }
    });
  }, []);

  // useEffect(() => {
  //   // JWT更新監視
  //   firebaseAuth.onIdTokenChanged((user) => {
  //     if (user) {
  //       const token = await user.getIdToken();
  //       const result = await user.getIdTokenResult();
  //       console.log(result.token);
  //       console.log(result.token === token);
  //       window.localStorage.setItem('access_token', token);
  //       console.log('change token', new Date());
  //       console.log(token);
  //     } else {
  //       window.localStorage.removeItem('access_token');
  //     }
  //   });
  // }, []);

  return (
    <Provider store={store}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
