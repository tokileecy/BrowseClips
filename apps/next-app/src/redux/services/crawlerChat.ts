import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../baseQuery';

export const crawlerChatApi = createApi({
  reducerPath: 'api/crawlerChat',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    syncChannels: builder.query<void, void>({
      query: () => ({ url: '/crawler-chat/sync-channels', method: 'get' }),
    }),
    listCrawlers: builder.query<string[], void>({
      query: () => ({ url: '/crawler-chat/crawlers', method: 'get' }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useLazySyncChannelsQuery, useListCrawlersQuery } =
  crawlerChatApi;
