const jwt = require("jsonwebtoken");
const { Users } = require("../models");
const { comparePasswords } = require("../utils/password-hash");

// get logged-in user details
const userDetails = async (req, res) => {
  const user = await Users.findByPk(req.user.userId);
  const { password, ...userDetails } = user.dataValues;
  res.status(200).send(userDetails);
};

// authenticate user
const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username } });

  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  const isMatch = await comparePasswords(password, user.password);
  if (isMatch) {
    const token = jwt.sign({ userId: user.userId }, process.env.JWT_KEY, {
      expiresIn: "7d",
    });
    const { password, ...userDetails } = user.dataValues;
    return res.status(200).send({ user: userDetails, token });
  } else {
    return res.status(401).send({ message: "Invalid Credentials" });
  }
};

// create new user
const signup = async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username } });

  if (user) {
    return res.status(409).send({ message: "User already exist" });
  }

  await Users.create({ username, password });
  res.status(201).send({ message: "Account created successfully" });
};

module.exports = {
  login,
  signup,
  userDetails,
};
