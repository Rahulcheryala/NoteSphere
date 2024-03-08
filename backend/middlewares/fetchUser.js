const jwt = require("jsonwebtoken");
const JWT_SECRET_SIGNATURE = "NoteSpherebyRahul";

const fetchUser = (req, res, next) => {
  // get the userId from the jwt token and add id to the requested object
  // get the token from the request header
  const token = req.header("auth-token");
  // Check if token exists or not
  if (!token) {
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token" });
  }
  try {
    // Check if the token is valid or not with jwt.verify()
    const data = jwt.verify(token, JWT_SECRET_SIGNATURE);
    // If valid,
    req.user = data.user;
    next();
  } catch (error) {
    // If not a valid token, send response
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchUser;
