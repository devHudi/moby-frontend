import axios from 'axios';

export const BASE_URL = process.env.REACT_APP_API_URL;

export const getAuthHeader = (jwt) => ({
  Authorization: `Bearer ${jwt}`,
});

export const service = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
