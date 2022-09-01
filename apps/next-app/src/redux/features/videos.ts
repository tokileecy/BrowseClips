import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API } from '@/api';

export type State = {
  ids: string[];
  videoMap: Record<string, API.Video>;
};

export const initialState: State = {
  ids: [],
  videoMap: {},
};

export const videosSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    setVideos: (state, action: PayloadAction<{ videos: API.Video[] }>) => {
      const { videos } = action.payload;

      const idSet = new Set<string>();

      videos.forEach((video) => {
        idSet.add(video.id);
        state.videoMap[video.id] = video;
      });
      state.ids = [...idSet];
    },

    updateVideos: (
      state,
      action: PayloadAction<{ videos: API.Video[]; ids?: string[] }>,
    ) => {
      const { videos, ids } = action.payload;

      if (ids) {
        state.ids = [...new Set(ids)];
      }

      videos.forEach((video) => {
        state.videoMap[video.id] = video;
      });
    },
  },
});

export const { setVideos, updateVideos } = videosSlice.actions;

export default videosSlice.reducer;
