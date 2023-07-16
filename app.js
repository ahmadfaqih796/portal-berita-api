require("dotenv").config();
const express = require("express");
const { connection } = require("./models");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const articleRoutes = require("./routes/article");
const { authenticateToken } = require("./middlewares/authMiddleware");

const app = express();
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Menambahkan route untuk pengguna
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/article", articleRoutes);

// route yang membutuhkan autentikasi
app.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "Protected route accessed successfully." });
});

connection.sync().then(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});
