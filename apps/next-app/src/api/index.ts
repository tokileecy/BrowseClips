import { Api } from '@vtuber_clip/api'
import getConfig from 'next/config'

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig()

const runtimeConfig =
  typeof document === 'undefined' ? serverRuntimeConfig : publicRuntimeConfig

const { NEST_URL } = runtimeConfig

const uri = new URL('', NEST_URL).href

export default new Api({
  baseURL: uri,
})
