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
}

export default new Api()
