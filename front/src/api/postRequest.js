import {
  BASE_URL,
  POST,
  CONTENT_TYPE,
  SUCCESS,
} from 'api/constants';

export const postRequest = async (endpoint, payload) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: POST,
    headers: {
      'Content-Type': CONTENT_TYPE,
    },
    body: JSON.stringify(payload),
  });

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
