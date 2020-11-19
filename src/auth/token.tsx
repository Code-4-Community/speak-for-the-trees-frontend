import { PrivilegeLevel } from './ducks/types';

/**
 * Returns a JWT Payload from localstorage OR falsy value if there is no valid token
 * @param {String} key one of LOCALSTORAGE_TOKEN_KEY.ACCESS or REFRESH_LOCALSTORAGE_TOKEN_KEY
 */

const getTokenPayload = (key: LOCALSTORAGE_TOKEN_KEY): TokenPayload => {
  const token = localStorage.getItem(key);
  if (!token)
    return { privilegeLevel: PrivilegeLevel.NONE, exp: 0, userId: -1 };
  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload !== null && payload;
};

interface TokenPayload {
  readonly privilegeLevel: PrivilegeLevel;
  readonly userId: number;
  readonly exp: number;
}

export enum LOCALSTORAGE_TOKEN_KEY {
  ACCESS = 'access_token',
  REFRESH = 'refresh_token',
}

export interface TokenService {
  readonly getAccessToken: () => string | null;
  readonly setAccessToken: (token: string) => void;
  readonly removeAccessToken: () => void;
  readonly getRefreshToken: () => string | null;
  readonly setRefreshToken: (token: string) => void;
  readonly removeRefreshToken: () => void;
  readonly getPrivilegeLevel: () => number;
  readonly getUserID: () => number;
  readonly isRefreshTokenValid: () => boolean;
}

const tokenService: TokenService = {
  getAccessToken() {
    return localStorage.getItem(LOCALSTORAGE_TOKEN_KEY.ACCESS);
  },
  setAccessToken(access: string) {
    localStorage.setItem(LOCALSTORAGE_TOKEN_KEY.ACCESS, access);
  },
  removeAccessToken() {
    localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY.ACCESS);
  },
  getRefreshToken() {
    return localStorage.getItem(LOCALSTORAGE_TOKEN_KEY.REFRESH);
  },
  setRefreshToken(refresh: string) {
    localStorage.setItem(LOCALSTORAGE_TOKEN_KEY.REFRESH, refresh);
  },
  removeRefreshToken() {
    localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY.REFRESH);
  },
  getPrivilegeLevel() {
    try {
      const payload = getTokenPayload(LOCALSTORAGE_TOKEN_KEY.ACCESS);
      if (!payload) return -1;
      if (payload.privilegeLevel === 0) return 0;
      return payload.privilegeLevel || -1;
    } catch (e) {
      return -1;
    }
  },
  getUserID() {
    try {
      const payload = getTokenPayload(LOCALSTORAGE_TOKEN_KEY.ACCESS);
      return payload.userId || -1;
    } catch (e) {
      return -1;
    }
  },
  isRefreshTokenValid() {
    const payload = getTokenPayload(LOCALSTORAGE_TOKEN_KEY.REFRESH);
    return payload && Math.round(Date.now() / 1000) < payload.exp;
  },
};

export default tokenService;
