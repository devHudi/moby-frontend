import { getAuthHeader, service } from 'apis/utils';
/**
 * Content-Type : multipart/form-data
 * @param {FormData} formData { profile : 200x200 }
 * @param {string} jwt
 */
export const uploadProfile = (formData, jwt) =>
  service({
    method: 'POST',
    data: formData,
    url: '/users/profile',
    headers: getAuthHeader(jwt),
  });

export const appendCard = (cardNumber, jwt) =>
  service({
    method: 'POST',
    data: { cardNumber },
    url: '/users/cards',
    headers: getAuthHeader(jwt),
  });

/**
 * 내 아티스트 원픽
 * @param {string} artistId 아티스트 ID
 * @param {string} jwt
 */
export const pickBestArtist = (artistId, jwt) =>
  service({
    method: 'POST',
    url: `/users/best-artist/${artistId}`,
    headers: getAuthHeader(jwt),
  });

export const deleteBestArtist = (jwt) =>
  service({
    method: 'DELETE',
    url: '/users/best-artist',
    headers: getAuthHeader(jwt),
  });

/**
 * 현재 유저 가져오기
 * FIX : apis.auth.verifyToken와 겹침
 * @param {string} jwt
 */
export const getCurrentUser = (jwt) =>
  service({
    method: 'GET',
    url: '/users',
    headers: getAuthHeader(jwt),
  });
