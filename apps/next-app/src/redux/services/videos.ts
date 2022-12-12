import { Video, ChannelCategory } from './types';
import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../baseQuery';

interface ListVideoParams {
  channelGroupIds?: number[];
  channelGroupNames?: string[];
  category?: ChannelCategory;
  size?: number;
  page?: number;
  cursor?: string;
  sortBy?: string;
  orderBy?: 'asc' | 'desc';
}

interface AddVideoByIdsPayload {
  ids: string[];
}

export const videoApi = createApi({
  reducerPath: 'api/videos',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    listVideos: builder.query<Video[], ListVideoParams>({
      query: (params) => ({ url: '/videos', method: 'get', params }),
      keepUnusedDataFor: 5,
    }),
    addVideoByIds: builder.mutation<Video[], AddVideoByIdsPayload>({
      query: (data) => ({ url: '/videos', method: 'post', data }),
    }),
  }),
});

export const {
  useListVideosQuery,
  useLazyListVideosQuery,
  useAddVideoByIdsMutation,
} = videoApi;
