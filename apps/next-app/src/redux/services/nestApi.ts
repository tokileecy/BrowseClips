import { API } from '@/api';
import { ChannelCategory } from '@browse_clips/api';
import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../baseQuery';

export const nestApi = createApi({
  reducerPath: 'nestApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    listVideos: builder.query<
      API.Video[],
      {
        category?: ChannelCategory;
        size?: number;
        page?: number;
        cursor?: string;
        sortBy?: string;
        orderBy?: 'asc' | 'desc';
      }
    >({
      query: (params) => ({ url: '/videos', method: 'get', params }),
      keepUnusedDataFor: 5,
    }),
    listChannels: builder.query<API.Channel[], void>({
      query: () => ({ url: '/channels', method: 'get' }),
    }),
    addChannelByIds: builder.mutation<
      void,
      {
        ids: string[];
        groupName?: string;
        category?: ChannelCategory;
      }
    >({
      query: (data) => ({ url: '/channels', method: 'post', data }),
    }),
    listChannelGroups: builder.query<API.ChannelGroupWithChannelIds[], void>({
      query: () => ({ url: '/channels/groups', method: 'get' }),
    }),
    getChannelGroupByName: builder.query<
      API.ChannelGroupWithChannel,
      string | undefined
    >({
      query: (name) => ({
        url: `/channels/groups/${name}`,
        method: 'get',
      }),
    }),
    createChannelGroup: builder.mutation<
      void,
      { name: string; channelIds?: string[] }
    >({
      query: (data) => ({
        url: '/channels/groups',
        method: 'post',
        data,
      }),
    }),
  }),
});

export const {
  useListVideosQuery,
  useListChannelsQuery,
  useCreateChannelGroupMutation,
  useGetChannelGroupByNameQuery,
  useListChannelGroupsQuery,
  useAddChannelByIdsMutation,
} = nestApi;
