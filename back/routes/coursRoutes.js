const express = require("express");
const router = express.Router();

const {
  createCours,
  deleteCours,
  updateCours,
  getCoursById,
  getCoursBystudentId,
  getCours,
  getCoursByteacherId
} = require("../controllers/coursController");

router.route("/").get(getCours).post(createCours);
router.route("/:id").get(getCoursById).delete(deleteCours);
router.route("/:id").put(updateCours);
router.route("/student/:id").get(getCoursBystudentId);
router.route("/teacher/:id").get(getCoursByteacherId);

module.exports = router;