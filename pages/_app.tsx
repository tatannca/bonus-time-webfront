import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { store } from '../store';
import { Provider } from 'react-redux';
import { FC, useEffect } from 'react';
import { firebaseAuth } from '../firebase/config';
import { useRouter } from 'next/router';

const StoreProvider: FC = ({ children }) => {
  // TODO: ラッパーが必要なさそうだったら後で消す
  // const router = useRouter();
  // useEffect(() => {
  //   const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
  //     if (user) {
  //       router.replace('/dashboard');
  //     } else {
  //     }
  //   });
  //   return () => unsubscribe();
  // }, [router, router.pathname]);

  return <Provider store={store}>{children}</Provider>;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </StoreProvider>
  );
}

export default MyApp;
