const jwt = require("jsonwebtoken");
const { TokenExpiredError } = jwt;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(403)
      .json({ message: "Request invalid, no token provided" });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_ACCESS_SEC, (err, _) => {
    if (err) {
      if (err instanceof TokenExpiredError) {
        return res.status(403).json({ message: "Access Token Expired" });
      }
      return res.status(403).json({ message: "Not Authenticated" });
    }
    next();
  });
};

module.exports = {
  verifyToken,
};
