import { getAuthHeader, service } from 'apis/utils';

export const addTransaction = (productId, jwt) =>
  service({
    method: 'POST',
    url: `/transactions/${productId}`,
    headers: getAuthHeader(jwt),
  });

export const getChart = (productId, jwt) =>
  service({
    method: 'GET',
    url: `/transactions/chart/${productId}`,
    headers: getAuthHeader(jwt),
  });
