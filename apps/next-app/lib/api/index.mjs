import apiInstance from '../api-instance.mjs'

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
    return apiInstance.get('/channels')
  }

  /**
   *
   * @param { string[] } ids
   * @returns
   */
  addChannelByIds = (ids) => {
    return apiInstance.post('/channels', {
      ids,
    })
  }

  syncChannelVideos = () => {
    return apiInstance.get('/channels/sync')
  }

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
    return apiInstance.get('/videos')
  }

  /**
   *
   * @param { string[] } ids
   * @returns
   */
  addVideoByIds = (ids) => {
    return apiInstance.post('/videos', {
      ids,
    })
  }
}

export default new Api()
