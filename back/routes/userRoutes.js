const express = require("express");
const router = express.Router();
const {verfiyPermission} = require("../middlewares/permission");
const {
  createUser,
  getUsers,
  deleteUser,
  updateUser,
} = require("../controllers/userController");

router.post("/", (req, res, next)=>verfiyPermission(req, res, next, ["admin"]), createUser);
router.get("/:role", (req, res, next)=>verfiyPermission(req, res, next, ["admin"]), getUsers);
router.delete("/:id", (req, res, next)=>verfiyPermission(req, res, next, ["admin"]), deleteUser);
router.put("/:id", (req, res, next)=>verfiyPermission(req, res, next, ["admin"]), updateUser);

module.exports = router;