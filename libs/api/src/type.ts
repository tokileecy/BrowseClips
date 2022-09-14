export interface Video {
  id: string;
  title?: string;
  description?: string;
  country?: string;
  publishedAt: string;
  thumbnails: Record<
    'standard' | 'high' | 'medium' | 'default',
    {
      height: number;
      width: number;
      url: string;
    }
  >;
}

export interface Channel {
  id: string;
  title?: string;
  description?: string;
  country?: string;
  publishedAt: string;
  thumbnails: Record<
    'standard' | 'high' | 'medium' | 'default',
    {
      height: number;
      width: number;
      url: string;
    }
  >;
}

export interface ChannelGroupWithChannelIds {
  id: number;
  name: string;
  channelIds?: string[];
}

export interface ChannelGroupWithChannel {
  id: number;
  name: string;
  channels: {
    channel: Channel;
  }[];
}

export interface AuthTokenData {
  accessToken: string;
}
