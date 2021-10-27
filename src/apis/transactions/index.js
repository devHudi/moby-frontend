import { getAuthHeader, service } from 'apis/utils';

export const getMyWallet = (jwt) =>
  service({
    method: 'GET',
    url: '​/transactions​/wallet',
    headers: getAuthHeader(jwt),
  });

export const addTransaction = (productId, price, quantity, jwt) =>
  service({
    method: 'POST',
    url: `/transactions/${productId}`,
    data: {
      price,
      quantity,
    },
    headers: getAuthHeader(jwt),
  });

export const getChart = (productId, jwt) =>
  service({
    method: 'GET',
    url: `/transactions/chart/${productId}`,
    headers: getAuthHeader(jwt),
  });

export const getTransaction = (transactionId, jwt) =>
  service({
    method: 'GET',
    url: `/transactions/success/${transactionId}`,
    headers: getAuthHeader(jwt),
  });
