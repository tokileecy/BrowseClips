import axios, { AxiosInstance } from 'axios';
import qs from 'qs';
import {
  AuthTokenData,
  Channel,
  ChannelGroupWithChannelIds,
  ChannelGroupWithChannel,
  Video,
} from './type';

export * from './type';

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
    return this.apiInstance.post<AuthTokenData>('/auth/login', data);
  };

  listChannels = () => {
    return this.apiInstance.get<Channel[]>('/channels');
  };

  addChannelByIds = (data: {
    ids: string[];
    groupName?: string;
    category?: ChannelCategory;
  }) => {
    return this.apiInstance.post('/channels', data);
  };

  listVideos = (data: {
    channelGroupIds?: number[];
    channelGroupNames?: string[];
    category?: ChannelCategory;
    size?: number;
    page?: number;
    cursor?: string;
    sortBy?: string;
    orderBy?: 'asc' | 'desc';
  }) => {
    const {
      channelGroupNames,
      channelGroupIds,
      category,
      size,
      page,
      cursor,
      sortBy,
      orderBy,
    } = data;

    return this.apiInstance.get<Video[]>('/videos', {
      params: {
        channelGroupNames,
        channelGroupIds,
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
    return this.apiInstance.get('/user/profile');
  };

  getChannelGroupByName = (name: string) => {
    return this.apiInstance.get<ChannelGroupWithChannel>(
      `/channels/groups/${name}`,
    );
  };

  listChannelGroups = () => {
    return this.apiInstance.get<ChannelGroupWithChannelIds[]>(
      '/channels/groups',
    );
  };

  createChannelGroup = (data: { name: string; channelIds?: string[] }) => {
    return this.apiInstance.post('/channels/groups', data);
  };
}

export default new Api();
