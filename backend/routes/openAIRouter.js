const express = require("express");
const { openAIController } = require("../controllers/openAIController");
const isAuthenticated = require("../middleware/isAuthenticated");
const checkApiRequestLimit = require("../middleware/checkApiRequestLimit");
const openAIRouter = express.Router();

openAIRouter.post(
  "/generate-content",
  isAuthenticated,
  checkApiRequestLimit,
  openAIController,
);

module.exports = openAIRouter;
