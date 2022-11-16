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
  status: unknown;
  statistics: unknown;
  contentDetails: unknown;
  liveStreamingDetails: unknown;
  youtubeData: {
    snippet: {
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
    };
    status: unknown;
    statistics: unknown;
    contentDetails: unknown;
    liveStreamingDetails: unknown;
  };
}
