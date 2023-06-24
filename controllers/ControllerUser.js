var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const DAOUser = require("../dao/DAOUser");
const ConfigCTA = require("../config/ConfigCTA");
const MiddlewareAuth = require("../middlewares/MiddlewareAuth");

const ControllerUser = require("express").Router();

ControllerUser.post("/signup", async (req, res) => {
  try {
    await DAOUser.create(
      req.body.email,
      req.body.password,
      req.body.is_superuser,
      req.body.is_staff,
      req.body.status
    );
    return res.status(201).json(ConfigCTA.CTA_MESSAGE_SUCCESS_SIGNUP);
  } catch (error) {
    console.log(error);
    return res.status(401).json(ConfigCTA.CTA_MESSAGE_REQUEST_ERROR);
  }
});

ControllerUser.post("/signin", async (req, res) => {
  try {
    const data = req.body;
    const { email, password } = data;
    const user = await DAOUser.get(email);

    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      const token = jwt.sign(
        {
          email: user.email,
          is_superuser: user.is_superuser,
          is_staff: user.is_staff,
        },
        process.env.TOKEN_KEY
        //  { expiredIn: "24h" }
      );
      user.token = token;
      return res.status(200).json({ token });
    }
    // return res.status(401).json(ConfigCTA.CTA_MESSAGE_SIGNIN_ERROR);
  } catch (error) {
    console.log(error);
    return res.status(400).json(ConfigCTA.CTA_MESSAGE_REQUEST_ERROR);
  }
});

module.exports = ControllerUser;
