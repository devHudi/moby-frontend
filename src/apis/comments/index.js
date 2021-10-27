import { getAuthHeader, service } from 'apis/utils';

export const commentAll = (contents, jwt) =>
  service({
    method: 'POST',
    url: '/comments',
    data: { contents },
    headers: getAuthHeader(jwt),
  });
