const express = require("express");
const router = express.Router();

const {
  CreateChapitre
} = require("../controllers/chapireController");

router.route("/").post(CreateChapitre);

module.exports = router;