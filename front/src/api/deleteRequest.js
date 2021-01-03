import { DELETE } from 'api/constants';
import request from 'api/request';

export const deleteRequest = async (endpoint, token = null) => request(endpoint, DELETE, {
  token,
});

export default deleteRequest;
