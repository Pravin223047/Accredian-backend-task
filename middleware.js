const express = require("express");
const cors = require("cors");

const applyMiddleware = (app) => {
  app.use(
    cors({
      origin: "https://accredian-eta.vercel.app",
      credentials: true,
    })
  );
  app.use(express.json());
};

module.exports = applyMiddleware;
