import { getAuthHeader, service } from 'apis/utils';

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
