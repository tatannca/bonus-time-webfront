import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { firebaseAuth } from '../../firebase/config';
import { updateUser } from '../../store/auth';
import { useAuthState } from '../../store/hooks';

export const PrivateRoute: FC = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { AuthState } = useAuthState();

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      if (!user) router.push('/');
      if (user && !AuthState.currentUser) dispatch(updateUser({ user }));
    });
    return () => unsubscribe();
  }, [router, dispatch, AuthState.currentUser]);

  if (!AuthState.currentUser) return <></>;

  return <>{children}</>;
};

export const OnlyPublicRoute: FC = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { AuthState } = useAuthState();

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(updateUser({ user }));
        router.replace('/dashboard');
      } else {
        dispatch(updateUser({ user: null }));
      }
    });
    return () => unsubscribe();
  }, [router, dispatch]);

  if (!!AuthState.currentUser || AuthState.currentUser === undefined) return <></>;

  return <>{children}</>;
};
