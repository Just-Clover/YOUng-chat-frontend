import axios from 'axios';

const rootUrl = import.meta.env.VITE_API_ROOT;

function createInstance(url) {
  const instance = axios.create({
    baseURL: rootUrl + url,
    headers: {
      "Content-Type": "application/json",
    }
  });
  return instance;
  //return interseptor
}

function createAuthInstance(url) {
  const instance = axios.create({
    baseURL: rootUrl + url,
  });
  return instance;
}

export const noAuthInstance = createInstance('/api/v1');
export const user = createAuthInstance('/api/v1/users');
