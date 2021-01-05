import { BASE_URL } from 'api/routes';

const GET = 'get';
const POST = 'post';
const DELETE = 'delete';
const PUT = 'put';

const CONTENT_TYPE = 'application/json';

// const SUCCESS = 200;

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
  if (params.abortController) {
    options.signal = params.abortController.signal;
  }

  const response = await fetch(url, options);

  return response.json();
};

export const getRequest = async (
  endpoint,
  searchParams,
  token = null,
  abortController = null,
) => request(endpoint, GET, {
  searchParams,
  token,
  abortController,
});

export const postRequest = async (
  endpoint,
  payload,
  token = null,
  abortController = null,
) => request(endpoint, POST, {
  payload,
  token,
  abortController,
});

export const deleteRequest = async (
  endpoint,
  token = null,
  abortController = null,
) => request(endpoint, DELETE, {
  token,
  abortController,
});

export const putRequest = async (
  endpoint,
  payload,
  token = null,
  abortController = null,
) => request(endpoint, PUT, {
  payload,
  token,
  abortController,
});

export default request;
