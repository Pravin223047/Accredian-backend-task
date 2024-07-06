const express = require("express");
const cors = require("cors");

const applyMiddleware = (app) => {
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(express.json());
};

module.exports = applyMiddleware;
