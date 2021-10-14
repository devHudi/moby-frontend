import { getAuthHeader, service } from 'apis/utils';

export const getAllFavProduct = (jwt) =>
  service({
    method: 'GET',
    url: '/favorites',
    headers: getAuthHeader(jwt),
  });

export const deleteFavProduct = (productId, jwt) =>
  service({
    method: 'DELETE',
    url: `/favorites/${productId}`,
    headers: getAuthHeader(jwt),
  });

export const appendFavProduct = (productId, jwt) =>
  service({
    method: 'PUT',
    url: `/favorites/${productId}`,
    headers: getAuthHeader(jwt),
  });
