enum TOKEN_KEY {
  ACCESS = 'access_token',
  REFRESH = 'refresh_token',
}

enum PrivilegeLevel {
  NONE = -1,
  STANDARD = 0,
  ADMIN = 1,
}

/**
 * Returns a JWT Payload from localstorage OR falsy value if there is no valid token
 * @param {String} key one of TOKEN_KEY.ACCESS or REFRESH_TOKEN_KEY
 */
const getTokenPayload = (key: TOKEN_KEY): TokenPayload => {
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

interface TokenService {
  readonly getAccessToken: () => void;
  readonly setAccessToken: (token: string) => void;
  readonly removeAccessToken: () => void;
  readonly getRefreshToken: () => void;
  readonly setRefreshToken: (token: string) => void;
  readonly removeRefreshToken: () => void;
  readonly getPrivilegeLevel: () => number;
  readonly getUserID: () => number;
  readonly isRefreshTokenValid: () => boolean;
}

const tokenService: TokenService = {
  getAccessToken() {
    return localStorage.getItem(TOKEN_KEY.ACCESS);
  },
  setAccessToken(access: string) {
    localStorage.setItem(TOKEN_KEY.ACCESS, access);
  },
  removeAccessToken() {
    localStorage.removeItem(TOKEN_KEY.ACCESS);
  },
  getRefreshToken() {
    return localStorage.getItem(TOKEN_KEY.REFRESH);
  },
  setRefreshToken(refresh: string) {
    localStorage.setItem(TOKEN_KEY.REFRESH, refresh);
  },
  removeRefreshToken() {
    localStorage.removeItem(TOKEN_KEY.REFRESH);
  },
  getPrivilegeLevel() {
    try {
      const payload = getTokenPayload(TOKEN_KEY.ACCESS);
      if (!payload) return -1;
      if (payload.privilegeLevel === 0) return 0;
      return payload.privilegeLevel || -1;
    } catch (e) {
      return -1;
    }
  },
  getUserID() {
    try {
      const payload = getTokenPayload(TOKEN_KEY.ACCESS);
      return payload.userId || -1;
    } catch (e) {
      return -1;
    }
  },
  isRefreshTokenValid() {
    const payload = getTokenPayload(TOKEN_KEY.REFRESH);
    return payload && Math.round(Date.now() / 1000) < payload.exp;
  },
};

export default tokenService;
