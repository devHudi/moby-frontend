import { getAuthHeader, service } from 'apis/utils';

export const getAllProduct = (jwt) =>
  service({
    method: 'GET',
    url: '/products',
    headers: getAuthHeader(jwt),
  });

/**
 * 최근에 등록된 상품 리스트
 * @param {number} limit 최대 가져올 상품 개수
 * @param {string} jwt
 */
export const getRecentProduct = (limit, jwt) =>
  service({
    method: 'GET',
    url: `/products/recent?limit=${limit}`,
    headers: getAuthHeader(jwt),
  });

/**
 * 상품 검색 후에 가져오기
 * @param {string} keyword 검색어
 * @param {string} jwt
 */
export const searchProduct = (keyword, jwt) =>
  service({
    method: 'GET',
    url: `/products/search?q=${keyword}`,
    headers: getAuthHeader(jwt),
  });

/**
 * 상품 랭킹별로 가져오기(좋아요 순 정렬)
 * @param {number} limit 한 페이지 당 최대 가져올 상품 개수
 * @param {number} page 가져올 총 페이지 개수
 * @param {string} jwt
 */
export const getProductsWithRakings = (limit, page, jwt) =>
  service({
    method: 'GET',
    url: `/products/rankings?limit=${limit}&page=${page}`,
    headers: getAuthHeader(jwt),
  });

/**
 * @param {string} productId 상품 아이디
 * @param {string} jwt
 */
export const getProductDetail = (productId, jwt) =>
  service({
    method: 'GET',
    url: `/products/${productId}`,
    headers: getAuthHeader(jwt),
  });

/**
 * @param {string} artistId 아티스트 아이디
 * @param {string} jwt
 */
export const getProductByArtistId = (artistId, jwt) =>
  service({
    method: 'GET',
    url: `/products/artists/${artistId}`,
    headers: getAuthHeader(jwt),
  });

/**
 * 방문자가 특정 상품 클릭시에 노출수 증가
 * @param {string} productId 아티스트 아이디
 * @param {string} jwt
 */
export const hitVisitCountOnProduct = (productId, jwt) =>
  service({
    method: 'PUT',
    url: '/visitors/hit/products',
    data: { id: productId },
    headers: getAuthHeader(jwt),
  });
