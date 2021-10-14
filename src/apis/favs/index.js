import { getAuthHeader, service } from 'apis/utils';

const getAllFavProduct = (jwt) =>
  service({
    method: 'GET',
    url: '/favorites',
    headers: getAuthHeader(jwt),
  });

const deleteFavProduct = (productId, jwt) =>
  service({
    method: 'DELETE',
    url: `/favorites/${productId}`,
    headers: getAuthHeader(jwt),
  });

const appendFavProduct = (productId, jwt) =>
  service({
    method: 'PUT',
    url: `/favorites/${productId}`,
    headers: getAuthHeader(jwt),
  });

export default { getAllFavProduct, deleteFavProduct, appendFavProduct };
