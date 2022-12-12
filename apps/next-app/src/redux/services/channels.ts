import { Channel, ChannelGroupWithChannel, ChannelCategory } from './types';
import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../baseQuery';

interface AddChannelByIdsPayload {
  ids: string[];
  groupName?: string;
  category?: ChannelCategory;
}

interface ListChannelGroupsParams {
  withVideos?: '1' | '0';
}

type GetChannelGroupByNameQuery = string | undefined;

interface CreateChannelGroupParams {
  name: string;
  channelIds?: string[];
}

export const channelApi = createApi({
  reducerPath: 'api/channels',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    listChannels: builder.query<Channel[], void>({
      query: () => ({ url: '/channels', method: 'get' }),
    }),
    addChannelByIds: builder.mutation<void, AddChannelByIdsPayload>({
      query: (data) => ({ url: '/channels', method: 'post', data }),
    }),
    listChannelGroups: builder.query<
      ChannelGroupWithChannel[],
      ListChannelGroupsParams
    >({
      query: (params) => ({ url: '/channels/groups', method: 'get', params }),
    }),
    getChannelGroupByName: builder.query<
      ChannelGroupWithChannel,
      GetChannelGroupByNameQuery
    >({
      query: (name) => ({
        url: `/channels/groups/${name}`,
        method: 'get',
      }),
    }),
    createChannelGroup: builder.mutation<void, CreateChannelGroupParams>({
      query: (data) => ({
        url: '/channels/groups',
        method: 'post',
        data,
      }),
    }),
    syncChannels: builder.query<void, void>({
      query: () => ({ url: '/crawler-chat/sync-channels', method: 'get' }),
    }),
  }),
});

export const {
  useListChannelsQuery,
  useCreateChannelGroupMutation,
  useGetChannelGroupByNameQuery,
  useListChannelGroupsQuery,
  useAddChannelByIdsMutation,
  useLazySyncChannelsQuery,
} = channelApi;
