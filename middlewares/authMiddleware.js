// middlewares/authMiddleware.js

const jwt = require("jsonwebtoken");

const jwtSecret =
  "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY4NzcwMTI4OSwiaWF0IjoxNjg3NzAxMjg5fQ.WIPnvWSEYmUOyFzYTt0P92dOoVFQZaryU-0m6g1CeXk"; // Ganti dengan secret key yang lebih aman

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
