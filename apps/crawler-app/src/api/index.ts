import apiInstance from './api-instance';

class Api {
  /**
   *
   * @returns { import('axios').AxiosResponse<{
   *  id: string,
   *  title: string?,
   *  description: string?,
   *  country: string?,
   *  publishedAt: DateTime,
   *  thumbnails: {
   *    height: number,
   *    width: number,
   *    url: string,
   *  }[],
   * }> }
   */
  listChannels = () => {
    return apiInstance.get<
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

  /**
   *
   * @param { string[] } ids
   * @returns
   */
  addChannelByIds = (ids: string[]) => {
    return apiInstance.post('/channels', {
      ids,
    });
  };

  // syncChannelVideos = () => {
  //   return apiInstance.get('/channels/sync');
  // };

  /**
   *
   * @returns { import('axios').AxiosResponse<{
   *  id: string,
   *  title: string?,
   *  description: string?,
   *  country: string?,
   *  publishedAt: DateTime,
   *  thumbnails: {
   *    height: number,
   *    width: number,
   *    url: string,
   *  }[],
   * }> }
   */
  listVideos = () => {
    return apiInstance.get('/videos');
  };

  addVideoByIds = (ids: string[]) => {
    return apiInstance.post('/videos', {
      ids,
    });
  };
}

export default new Api();
