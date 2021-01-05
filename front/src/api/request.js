import { BASE_URL } from 'api/routes';

const GET = 'get';
const POST = 'post';
const DELETE = 'delete';
const PUT = 'put';

const CONTENT_TYPE = 'application/json';

const SUCCESS = 200;

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

export const getRequest = async (endpoint, searchParams, token = null) => request(endpoint, GET, {
  searchParams,
  token,
});

export const postRequest = async (endpoint, payload, token = null) => request(endpoint, POST, {
  payload,
  token,
});

export const deleteRequest = async (endpoint, token = null) => request(endpoint, DELETE, {
  token,
});

export const putRequest = async (endpoint, payload, token = null) => request(endpoint, PUT, {
  payload,
  token,
});

export default request;
