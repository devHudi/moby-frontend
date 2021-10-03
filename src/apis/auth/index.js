import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

const verifyToken = (jwt) =>
  axios({
    method: 'GET',
    url: '/users',
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

const signIn = (email, password) =>
  axios({
    method: 'POST',
    url: '/users/login',
    baseURL: BASE_URL,
    data: {
      email,
      password,
    },
  });

const signUp = (username, phoneNumber, email, password) =>
  axios({
    method: 'POST',
    url: '/users',
    baseURL: BASE_URL,
    data: {
      username,
      phoneNumber,
      email,
      password,
    },
  });

export default {
  verifyToken,
  signIn,
  signUp,
};
