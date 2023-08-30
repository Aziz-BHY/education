const express = require("express");
const router = express.Router();

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

router.route("/").post(createClasse).get(getClasses);
router.route("/student").post(addStudentToClasse).delete(deleteStudentFromClasse);
router.route("/cours").post(addCoursToClasse).delete(deleteCoursFromClasse);
router.route("/:id").delete(deleteClasse).put(updateClasse).get(getClasse);

module.exports = router;