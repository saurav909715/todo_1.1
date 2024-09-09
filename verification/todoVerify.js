const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.header("Authorization");
//   console.log(token) // Your secret

  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, "lwdldm");
    // console.log(decoded) // Your secret
    req.user = decoded; // Attach the decoded token to the request
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};

module.exports = {authenticate}