import { getAuthHeader, service } from 'apis/utils';

const verifyToken = (jwt) =>
  service({
    method: 'GET',
    url: '/users',
    headers: getAuthHeader(jwt),
  });

const signIn = (email, password) =>
  service({
    method: 'POST',
    url: '/users/login',
    data: {
      email,
      password,
    },
  });

const signUp = (username, phoneNumber, email, password) =>
  service({
    method: 'POST',
    url: '/users',
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
