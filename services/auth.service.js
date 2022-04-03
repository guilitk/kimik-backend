import {
  getUserByUsername,
  setRefreshToken,
  getUserByRefreshToken,
} from "../repositories/user.repository.js";
import { verifyPassword } from "../utils/encryption.js";
import { getAuthenticationTokens } from "../utils/token.js";

async function login({ username, password }) {
  const user = await getUserByUsername(username);
  const isValidPassword = await verifyPassword(password, user.password);

  if (!isValidPassword) {
    throw new Error("WRONG_USERNAME_OR_PASSWORD");
  }

  const { accessToken, idToken, refreshToken } = await getAuthenticationTokens(
    user
  );

  const refreshTokenExpiration = new Date(
    (Date.now() / 1000 + 60 * 60 * 24) * 1000
  );

  await setRefreshToken(refreshToken, refreshTokenExpiration, user.username);

  return { accessToken, idToken, refreshToken };
}

async function refreshToken({ token }) {
  const user = await getUserByRefreshToken(token);
  const isValidRefreshToken = user.refreshTokenExpiration >= new Date();

  if (!isValidRefreshToken) {
    throw new Error("REFRESH_TOKEN_EXPIRED");
  }

  const { accessToken, idToken, refreshToken } = await getAuthenticationTokens(
    user
  );

  const refreshTokenExpiration = new Date(
    (Date.now() / 1000 + 60 * 60 * 24) * 1000
  );

  await setRefreshToken(refreshToken, refreshTokenExpiration, user.username);

  return { accessToken, idToken, refreshToken };
}

export const authService = {
  login,
  refreshToken,
};
