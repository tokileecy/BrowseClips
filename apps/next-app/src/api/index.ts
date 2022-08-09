import apiInstance from './api-instance'

class Api {
  listChannels = () => {
    return apiInstance.get<
      {
        id: string
        title?: string
        description?: string
        country?: string
        publishedAt: string
        thumbnails: {
          height: number
          width: number
          url: string
        }[]
      }[]
    >('/channels')
  }

  addChannelByIds = (ids: string[]) => {
    return apiInstance.post('/channels', {
      ids,
    })
  }

  // syncChannelVideos = () => {
  //   return apiInstance.get('/channels/sync')
  // }

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
  addVideoByIds = (ids: string[]) => {
    return apiInstance.post('/videos', {
      ids,
    })
  }
}

export default new Api()
