import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAuthState = () => {
  const AuthState = useAppSelector((state) => state.auth);
  return { AuthState };
};

export const useUtilsState = () => {
  const UtilsState = useAppSelector((state) => state.utils);
  return { UtilsState };
};
