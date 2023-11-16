require('express-async-errors');
const express = require("express");
const users = require("../routes/users");
const products = require("../routes/products");
const error = require("../middlewares/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/users", users);
  app.use("/api/products", products);
  app.use(error)
};
