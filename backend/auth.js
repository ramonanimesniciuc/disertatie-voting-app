// middlewares/auth.js

const jwt = require("jsonwebtoken");
const secret = Buffer.from('b67ec320131d728efe107bd179c106e3bd24e621aed03a9e8e2004d9b3c0f6a1', 'hex')
module.exports = (req, res, next) => {
  try {
    console.log(req.headers);
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    jwt.verify(token, 'coolapplicationisthekey');
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "No token provided" });
  }
};
