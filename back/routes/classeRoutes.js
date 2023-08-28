const express = require("express");
const router = express.Router();

const {
    createClasse,
    deleteClasse,
    updateClasse,
    addStudentToClasse,
    addCoursToClasse,
    getClasse,
    getClasses
} = require("../controllers/classeController");

router.route("/").post(createClasse).get(getClasses);
router.route("/:id").delete(deleteClasse).put(updateClasse).get(getClasse);
router.route("/:id/student").post(addStudentToClasse);
router.route("/:id/cours").post(addCoursToClasse);

module.exports = router;