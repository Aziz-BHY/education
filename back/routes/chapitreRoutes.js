const express = require("express");
const router = express.Router();
const {verfiyPermission} = require("../middlewares/permission");

const {
  CreateChapitre,
  deleteContent,
  deleteChapitre,
  updateChapitre,
  getContent
} = require("../controllers/chapireController");

router.post("/", (req, res, next)=>verfiyPermission(req, res, next, ["teacher"]), CreateChapitre);
router.delete("/:id", (req, res, next)=>verfiyPermission(req, res, next, ["teacher"]), deleteChapitre);
router.put("/:id", (req, res, next)=>verfiyPermission(req, res, next, ["teacher"]), updateChapitre);
router.delete("/:chapitreId/content/:contentId", (req, res, next)=>verfiyPermission(req, res, next, ["teacher"]), deleteContent);
router.get("/:chapitreId/content/:contentId", (req, res, next)=>verfiyPermission(req, res, next, ["teacher"]), getContent);

module.exports = router;