const express = require("express");
const router = express.Router();
const {verfiyPermission} = require("../middlewares/permission");

const {
    createClasse,
    deleteClasse,
    updateClasse,
    addStudentToClasse,
    addCoursToClasse,
    getClasse,
    getClasses,
    deleteCoursFromClasse,
    deleteStudentFromClasse
} = require("../controllers/classeController");


router.post("/", (req, res, next)=>verfiyPermission(req, res, next, ["admin"]), createClasse);
router.get("/", (req, res, next)=>verfiyPermission(req, res, next, ["admin"]), getClasses);
router.post("/student", (req, res, next)=>verfiyPermission(req, res, next, ["admin"]), addStudentToClasse);
router.delete("/student", (req, res, next)=>verfiyPermission(req, res, next, ["admin"]), deleteStudentFromClasse);
router.post("/cours", (req, res, next)=>verfiyPermission(req, res, next, ["admin"]), addCoursToClasse);
router.delete("/cours", (req, res, next)=>verfiyPermission(req, res, next, ["admin"]), deleteCoursFromClasse);
router.delete("/:id", (req, res, next)=>verfiyPermission(req, res, next, ["admin"]), deleteClasse);
router.put("/:id", (req, res, next)=>verfiyPermission(req, res, next, ["admin"]), updateClasse);
router.get("/:id", (req, res, next)=>verfiyPermission(req, res, next, ["admin"]), getClasse);

module.exports = router;