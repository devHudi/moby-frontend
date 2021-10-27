import { getAuthHeader, service } from 'apis/utils';

export const addTransaction = (productId, jwt) =>
  service({
    method: 'POST',
    url: `/transactions/${productId}`,
    headers: getAuthHeader(jwt),
  });
