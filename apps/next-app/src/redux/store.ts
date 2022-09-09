import { configureStore } from '@reduxjs/toolkit';
import auth from './features/auth';
import videos from './features/videos';

const store = configureStore({
  devTools: process.env.NODE_ENV === 'development',
  reducer: {
    auth,
    videos,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
