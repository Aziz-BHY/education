const express = require("express");
const router = express.Router();

const {
  auth,
} = require("../controllers/authController");

router.route("/auth").get(auth);

module.exports = router;