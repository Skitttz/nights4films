export const setCookie = (
  name: string,
  value: string,
  options?: { days?: number; path?: string; sameSite?: 'Lax' | 'Strict' | 'None'; secure?: boolean }
) => {
  const days = options?.days ?? 7;
  const path = options?.path ?? '/';
  const sameSite = options?.sameSite ?? 'Lax';
  const secure = options?.secure ?? (typeof window !== 'undefined' && window.location.protocol === 'https:');
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  const secureAttr = secure ? '; Secure' : '';
  document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}; Path=${path}; SameSite=${sameSite}${secureAttr}`;
};

export const getCookie = (name: string): string | null => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
  }
  return null;
};

export const removeCookie = (name: string, path: string = '/') => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=${path}`;
};
