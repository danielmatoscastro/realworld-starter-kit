import { BASE_URL, SUCCESS } from './constants';

export const getRequest = async (endpoint, searchParams) => {
  const url = new URL(`${BASE_URL}${endpoint}`);
  if (searchParams) {
    url.search = new URLSearchParams(searchParams);
  }

  const response = await fetch(url);
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
