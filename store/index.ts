import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import utilsReducer from './utils';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    utils: utilsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // TODO: あとで直したほうが良いかも
      serializableCheck: false
      // serializableCheck: {
      //   ignoredActions: ['auth/requestSignIn/pending', 'auth/requestSignIn/rejected', 'auth/updateUser']
      // }
    })
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
