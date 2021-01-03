import {
  CONTENT_TYPE,
  BASE_URL,
  SUCCESS,
} from './constants';

const request = async (endpoint, method, params) => {
  const url = new URL(`${BASE_URL}${endpoint}`);
  if (params.searchParams) {
    url.search = new URLSearchParams(params.searchParams);
  }

  const headers = {
    'Content-Type': CONTENT_TYPE,
  };
  if (params.token) {
    headers.Authorization = `Token ${params.token}`;
  }

  const options = {
    method,
    headers,
  };
  if (params.payload) {
    options.body = JSON.stringify(params.payload);
  }

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

export default request;
