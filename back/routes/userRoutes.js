const express = require("express");
const router = express.Router();

const {
  createUser,
  getUsers,
} = require("../controllers/userController");

router.route("/").post(createUser);
router.route("/:role").get(getUsers);

module.exports = router;