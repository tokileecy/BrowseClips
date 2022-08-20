import { configureStore } from '@reduxjs/toolkit';
import auth from './features/auth/authSlice';

const store = configureStore({
  devTools: process.env.APP_ENV === 'development',
  reducer: {
    auth,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
