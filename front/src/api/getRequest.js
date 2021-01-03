import { GET } from './constants';
import request from './request';

// searchParams = null, payload = null, token = null
export const getRequest = async (endpoint, searchParams, token = null) => request(endpoint, GET, {
  searchParams,
  token,
});

export default getRequest;
