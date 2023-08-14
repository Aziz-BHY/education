const express = require("express");
const router = express.Router();

const {
    createClasse,
    deleteClasse,
    updateClasse,
    addStudentToClasse,
    addCoursToClasse
} = require("../controllers/classeController");

router.route("/").post(createClasse);
router.route("/:id").delete(deleteClasse).put(updateClasse);
router.route("/:id/student").post(addStudentToClasse);
router.route("/:id/cours").post(addCoursToClasse);

module.exports = router;