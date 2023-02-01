const jwt = require("jsonwebtoken");
const { JWT_ACCESS_EXPIRATION } = require("../configs/config");

const tokenGenerator = (expiry, secretKey) => {
  return jwt.sign({}, secretKey, {
    expiresIn: expiry,
  });
};

const generateToken = (_, res) => {
  const accessToken = tokenGenerator(
    JWT_ACCESS_EXPIRATION,
    process.env.JWT_ACCESS_SEC
  );

  res.status(201).json(accessToken);
};

module.exports = {
  generateToken,
};
