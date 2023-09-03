const express = require("express");
const router = express.Router();

const {
  CreateChapitre,
  deleteContent,
  deleteChapitre,
  updateChapitre,
  getContent
} = require("../controllers/chapireController");

router.route("/").post(CreateChapitre);
router.route("/:id").delete(deleteChapitre).put(updateChapitre);
router.route("/:chapitreId/content/:contentId").delete(deleteContent).get(getContent)
module.exports = router;