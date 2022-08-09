import getConfig from 'next/config'
import axios from 'axios'
import qs from 'qs'

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig()

const runtimeConfig =
  typeof document === 'undefined' ? serverRuntimeConfig : publicRuntimeConfig

const { NEST_URL } = runtimeConfig

const uri = new URL('', NEST_URL).href

/** @type {import('axios').AxiosInstance} */
const instance = axios.create({
  baseURL: uri,
  timeout: 10000,
})

instance.defaults.paramsSerializer = (params) => {
  return qs.stringify(params)
}

export default instance
