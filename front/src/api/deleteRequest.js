import {
  BASE_URL,
  DELETE,
  CONTENT_TYPE,
  SUCCESS,
} from 'api/constants';

export const deleteRequest = async (endpoint, token = null) => {
  const headers = {
    'Content-Type': CONTENT_TYPE,
  };
  if (token !== null) {
    headers.Authorization = `Token ${token}`;
  }

  const options = {
    method: DELETE,
    headers,
  };

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

export default deleteRequest;
