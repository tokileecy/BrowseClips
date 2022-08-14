import { configureStore } from '@reduxjs/toolkit'
import videos from './features/videos/videoSlice'
import auth from './features/auth/authSlice'

const store = configureStore({
  devTools: process.env.APP_ENV === 'development',
  reducer: {
    auth,
    videos,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
