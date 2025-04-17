type CookieOptions = {
  days?: number;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
};

export const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
};

export const setCookie = (
  name: string,
  value: string,
  options: CookieOptions = {}
): void => {
  const {
    days = 7,
    path = "/",
    domain,
    secure = false,
    sameSite = "Lax",
  } = options;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();

  let cookieString = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires}; path=${path}`;

  if (domain) cookieString += `; domain=${domain}`;
  if (secure) cookieString += "; Secure";
  if (sameSite) cookieString += `; SameSite=${sameSite}`;

  document.cookie = cookieString;
};

export const deleteCookie = (
  name: string,
  path = "/",
  domain?: string
): void => {
  let cookieString = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}`;
  if (domain) cookieString += `; domain=${domain}`;
  document.cookie = cookieString;
};

export const getAllCookies = (): Record<string, string> => {
  return document.cookie
    .split("; ")
    .filter(Boolean)
    .reduce((acc, cookie) => {
      const [key, ...v] = cookie.split("=");
      acc[decodeURIComponent(key)] = decodeURIComponent(v.join("="));
      return acc;
    }, {} as Record<string, string>);
};
