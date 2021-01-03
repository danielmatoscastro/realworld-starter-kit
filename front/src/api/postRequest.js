import {
  BASE_URL,
  POST,
  CONTENT_TYPE,
  SUCCESS,
} from 'api/constants';

export const postRequest = async (endpoint, payload, token = null) => {
  const headers = {
    'Content-Type': CONTENT_TYPE,
  };
  if (token !== null) {
    headers.Authorization = `Token ${token}`;
  }

  const options = {
    method: POST,
    headers,
  };
  if (payload !== null) {
    options.body = JSON.stringify(payload);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, options);

  const data = await response.json();

  return new Promise((resolve, reject) => {
    if (response.status === SUCCESS) {
      resolve(data);
    } else {
      reject(data);
    }
  });
};

export default postRequest;
