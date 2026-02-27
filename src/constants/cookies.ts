export const TOKEN_COOKIE_NAME_SECURE = '__Secure-nights4films_auth';
export const TOKEN_COOKIE_NAME_DEFAULT = 'nights4films_auth';
export const getTokenCookieName = () =>
  typeof window !== 'undefined' && window.location.protocol === 'https:'
    ? TOKEN_COOKIE_NAME_SECURE
    : TOKEN_COOKIE_NAME_DEFAULT;
