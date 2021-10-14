import { getAuthHeader, service } from 'apis/utils';

export const getAllArtist = (jwt) =>
  service({
    method: 'GET',
    url: '/artists',
    headers: getAuthHeader(jwt),
  });

/**
 * @param {string} keyword 검색어
 * @param {string} jwt
 */
export const searchArtist = (keyword, jwt) =>
  service({
    method: 'GET',
    url: `/artists?q=${keyword}`,
    headers: getAuthHeader(jwt),
  });

/**
 * 모든 아티스트의 댓글 가져오기
 * @param {number} limit 한 페이지에 나올 객체 수
 * @param {number} page 현재 페이지 1부터 시작
 * @param {string} jwt
 */
export const getAllArtistCommentsWithPagenation = (limit, page, jwt) =>
  service({
    method: 'GET',
    url: `/artists/comments?limit=${limit}&page=${page}`,
    headers: getAuthHeader(jwt),
  });

/**
 * @param {number} limit 한 페이지에 나올 객체 수
 * @param {number} page 현재 페이지 1부터 시작
 * @param {string} jwt
 */
export const getArtistsWithRakings = (limit, page, jwt) =>
  service({
    method: 'GET',
    url: `/artists/rankings?limit=${limit}&page=${page}`,
    headers: getAuthHeader(jwt),
  });

/**
 * @param {string} artistId 아티스트 아이디
 * @param {string} jwt
 */
export const getArtistDetail = (artistId, jwt) =>
  service({
    method: 'GET',
    url: `/artists/${artistId}`,
    headers: getAuthHeader(jwt),
  });

/**
 * 아티스트에 댓글 남기기
 * @param {string} artistId 아티스트 아이디
 * @param {string} contents 댓글 내용
 * @param {string} jwt
 */
export const commentArtist = (artistId, contents, jwt) =>
  service({
    method: 'POST',
    url: `/artists/${artistId}/comments`,
    data: { contents },
    headers: getAuthHeader(jwt),
  });

/**
 * 특정 아티스트의 댓글들 가져오기
 * @param {string} artistId 아티스트 아이디
 * @param {string} jwt
 */
export const getCommentsByArtist = (artistId, jwt) =>
  service({
    method: 'GET',
    url: `/artists/${artistId}/comments`,
    headers: getAuthHeader(jwt),
  });

/**
 * 특정 아티스트의 특정 댓글 삭제하기
 * @param {string} artistId 아티스트 아이디
 * @param {string} commentId 아티스트 아이디
 * @param {string} contents 댓글 내용
 * @param {string} jwt
 */
export const deleteCommentsByArtist = (artistId, commentId, jwt) =>
  service({
    method: 'DELETE',
    url: `/artists/${artistId}/comments/${commentId}`,
    headers: getAuthHeader(jwt),
  });

/**
 * 방문자가 특정 아티스트 클릭시에 노출수 증가
 * @param {string} artistId 아티스트 아이디
 * @param {string} jwt
 */
export const hitVisitCountOnArtist = (artistId, jwt) =>
  service({
    method: 'PUT',
    url: '/visitors/hit/artists',
    data: { id: artistId },
    headers: getAuthHeader(jwt),
  });
