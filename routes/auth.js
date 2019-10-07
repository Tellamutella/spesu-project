const express = require("express");
const router = express.Router();

router.get("/login", (request, response, next) => {
  response.render("index");
});

module.exports = router;
