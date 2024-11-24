const express = require("express");
const { createUser, loginUser } = require("../controllers/user");
const router = express.Router();

router.post("/", createUser);
router.post("/login", loginUser);

module.exports = router;
