import { configureStore } from '@reduxjs/toolkit';
import auth from './features/auth';
import videos from './features/videos';
import { channelApi } from './services/channels';
import { videoApi } from './services/videos';
import { authApi } from './services/auth';

const store = configureStore({
  devTools: process.env.NODE_ENV === 'development',
  reducer: {
    [channelApi.reducerPath]: channelApi.reducer,
    [videoApi.reducerPath]: videoApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth,
    videos,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      channelApi.middleware,
      videoApi.middleware,
      authApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
