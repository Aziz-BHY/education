const express = require("express");
const router = express.Router();
const {verfiyPermission} = require("../middlewares/permission");

const {
  createCours,
  deleteCours,
  updateCours,
  getCoursById,
  getCoursBystudentId,
  getCours,
  getCoursByteacherId
} = require("../controllers/coursController");

router.get("/", (req, res, next)=>verfiyPermission(req, res, next, ["admin", "teacher", "student"]), getCours);
router.post("/", (req, res, next)=>verfiyPermission(req, res, next, ["admin", "teacher"]), createCours);
router.get("/:id", (req, res, next)=>verfiyPermission(req, res, next, ["admin", "teacher", "student"]), getCoursById);
router.delete("/:id", (req, res, next)=>verfiyPermission(req, res, next, ["admin"]), deleteCours);
router.put("/:id", (req, res, next)=>verfiyPermission(req, res, next, ["admin", "teacher"]), updateCours);
router.get("/student/:id", (req, res, next)=>verfiyPermission(req, res, next, ["student"]), getCoursBystudentId);
router.get("/teacher/:id", (req, res, next)=>verfiyPermission(req, res, next, ["teacher"]), getCoursByteacherId);

module.exports = router;