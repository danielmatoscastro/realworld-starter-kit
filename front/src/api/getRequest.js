import {
  BASE_URL, GET, SUCCESS, CONTENT_TYPE,
} from './constants';

export const getRequest = async (endpoint, searchParams, token = null) => {
  const url = new URL(`${BASE_URL}${endpoint}`);
  if (searchParams) {
    url.search = new URLSearchParams(searchParams);
  }

  const headers = {
    'Content-Type': CONTENT_TYPE,
  };
  if (token !== null) {
    headers.Authorization = `Token ${token}`;
  }

  const options = {
    method: GET,
    headers,
  };

  const response = await fetch(url, options);
  const data = await response.json();

  return new Promise((resolve, reject) => {
    if (response.status === SUCCESS) {
      resolve(data);
    } else {
      reject(data);
    }
  });
};

export default getRequest;
