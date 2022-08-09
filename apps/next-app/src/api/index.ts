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

  listVideos = () => {
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
    >('/videos')
  }

  addVideoByIds = (ids: string[]) => {
    return apiInstance.post('/videos', {
      ids,
    })
  }
}

export default new Api()