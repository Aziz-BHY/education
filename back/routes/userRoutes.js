const express = require("express");
const router = express.Router();

const {
  createUser,
  getUsers,
  deleteUser,
  updateUser,
} = require("../controllers/userController");

router.route("/").post(createUser);
router.route("/:role").get(getUsers);
router.route("/:id").delete(deleteUser).put(updateUser);
module.exports = router;