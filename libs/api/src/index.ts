import axios, { AxiosInstance } from 'axios';
import qs from 'qs';

export type ChannelCategory = 'Streamer' | 'Clipper';
export interface ApiOtiopns {
  baseURL?: string;
}

export class Api {
  jwt: string;
  apiInstance: AxiosInstance;

  constructor(options: ApiOtiopns = {}) {
    const { baseURL = '/' } = options;

    this.jwt = '';

    this.apiInstance = axios.create({
      baseURL,
      timeout: 10000,
    });

    this.apiInstance.defaults.paramsSerializer = (params) => {
      return qs.stringify(params);
    };
  }

  setJwt = (jwt: string) => {
    this.jwt = jwt;
    this.apiInstance.defaults.headers.common.Authorization = `Bearer ${this.jwt}`;
  };

  login = (data: { username: string; password: string }) => {
    return this.apiInstance.post<
      {
        username: string;
        password: string;
      },
      { data: { accessToken: string } }
    >('/auth/login', data);
  };

  listChannels = () => {
    return this.apiInstance.get<
      {
        id: string;
        title?: string;
        description?: string;
        country?: string;
        publishedAt: string;
        thumbnails: {
          height: number;
          width: number;
          url: string;
        }[];
      }[]
    >('/channels');
  };

  addChannelByIds = (data: {
    ids: string[];
    groupName?: string;
    category?: ChannelCategory;
  }) => {
    return this.apiInstance.post('/channels', data);
  };

  listVideos = (data: {
    category?: ChannelCategory;
    size?: number;
    page?: number;
    cursor?: string;
    sortBy?: string;
    orderBy?: 'asc' | 'desc';
  }) => {
    const { category, size, page, cursor, sortBy, orderBy } = data;

    return this.apiInstance.get<
      {
        id: string;
        title?: string;
        description?: string;
        country?: string;
        publishedAt: string;
        thumbnails: {
          height: number;
          width: number;
          url: string;
        }[];
      }[]
    >('/videos', {
      params: {
        category,
        size,
        page,
        cursor,
        sortBy,
        orderBy,
      },
    });
  };

  addVideoByIds = (ids: string[]) => {
    return this.apiInstance.post('/videos', {
      ids,
    });
  };

  getUserProfile = () => {
    return this.apiInstance.get<{ data: { accessToken: string } }>(
      '/user/profile',
    );
  };

  getChannelGroupByName = (name: string) => {
    return this.apiInstance.get<{
      id: number;
      name: string;
      channels: {
        channel: {
          id: string;
          title?: string;
          description?: string;
          country?: string;
          publishedAt: string;
          thumbnails: {
            height: number;
            width: number;
            url: string;
          }[];
        };
      }[];
    }>(`/channels/groups/${name}`);
  };

  listChannelGroups = () => {
    return this.apiInstance.get<
      {
        id: number;
        name: string;
        channelIds?: string[];
      }[]
    >('/channels/groups');
  };

  createChannelGroup = (data: { name: string; channelIds?: string[] }) => {
    return this.apiInstance.post('/channels/groups', data);
  };
}

export default new Api();
