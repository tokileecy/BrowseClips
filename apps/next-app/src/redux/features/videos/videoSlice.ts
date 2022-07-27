import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Video = {
  imgUrl: string
  userName: string
  name: string
  description: string
}

export type InitialState = {
  ids: string[]
  itemById: Record<string, Video>
}

export const initialState: InitialState = {
  ids: [],
  itemById: {},
}

export const videoSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    setVideos: (
      state,
      action: PayloadAction<{
        ids: string[]
        itemById: Record<string, Video>
      }>
    ) => {
      state.ids = action.payload.ids
      state.itemById = action.payload.itemById
    },
  },
})

export const { setVideos } = videoSlice.actions

export default videoSlice.reducer
