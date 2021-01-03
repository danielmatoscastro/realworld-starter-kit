import { POST } from 'api/constants';
import request from 'api/request';

export const postRequest = async (endpoint, payload, token = null) => request(endpoint, POST, {
  payload,
  token,
});

export default postRequest;
