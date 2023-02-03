export const authConstants = {
  accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
  accessTokenExpiry: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
  refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
  refreshTokenExpiry: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
};
