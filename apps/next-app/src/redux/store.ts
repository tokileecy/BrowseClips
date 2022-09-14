import { configureStore } from '@reduxjs/toolkit';
import auth from './features/auth';
import videos from './features/videos';
import { nestApi } from './services/nestApi';

const store = configureStore({
  devTools: process.env.NODE_ENV === 'development',
  reducer: {
    [nestApi.reducerPath]: nestApi.reducer,
    auth,
    videos,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(nestApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
