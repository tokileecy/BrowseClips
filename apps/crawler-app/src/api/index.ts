import { Api } from '@vtuber_clip/api';

const NEST_URL = process.env.NEST_URL;
const uri = new URL('', NEST_URL).href;

export default new Api({
  baseURL: uri,
});
