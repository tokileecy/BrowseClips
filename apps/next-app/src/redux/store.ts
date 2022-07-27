import { configureStore } from '@reduxjs/toolkit'
import videos from './features/videos/videoSlice'

const store = configureStore({
  devTools: true,
  reducer: {
    videos,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
