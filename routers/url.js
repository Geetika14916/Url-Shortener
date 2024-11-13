const express = require("express");
const router = express.Router();
const {
  generateNewUrl,
  redirectToUrl,
  giveAnalytics,
} = require("../controllers/url.js");

router.post("/", generateNewUrl);
router.get("/:shortId", redirectToUrl);
router.get("/analytics/:shortId", giveAnalytics);
module.exports = router;
