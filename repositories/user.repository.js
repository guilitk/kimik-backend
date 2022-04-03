import { executeQuery } from "../database.js";

const getUserByUsername = async username => {
  const queryString = `SELECT * FROM users WHERE username = ?`;

  const user = (await executeQuery(queryString, username))[0];
  console.log(user);
  return {
    username: user.username,
    password: user.password,
    email: user.email,
    name: user.name,
  };
};

const getUserByRefreshToken = async refreshToken => {
  const queryString = `SELECT * FROM users WHERE refresh_token = ?`;

  const user = (await executeQuery(queryString, refreshToken))[0];

  return {
    username: user.username,
    password: user.password,
    email: user.email,
    name: user.name,
    refreshTokenExpiration: user.refresh_token_expire,
  };
};

const createUser = async ({ username, password, email, name }) => {
  const queryString = `INSERT INTO users (username,email,password,name) VALUES (?,?,?,?)`;
  await executeQuery(queryString, [
    username,
    email ?? null,
    password,
    name ?? null,
  ]);
};

const setRefreshToken = async (refreshToken, refreshTokenExpire, username) => {
  const queryString = `UPDATE users SET refresh_token = ?,refresh_token_expire=? WHERE username = ?`;

  await executeQuery(queryString, [refreshToken, refreshTokenExpire, username]);
};

export {
  getUserByUsername,
  createUser,
  setRefreshToken,
  getUserByRefreshToken,
};
