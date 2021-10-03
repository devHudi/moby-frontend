import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

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
  signIn,
  signUp,
};
