const express = require("express");
const router = express.Router();
const multer  = require('multer')
const fs = require('fs');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let path = `./uploads/cours/${req.params.coursId}/chapitres/${req.params.chapitreId}/`
    fs.mkdirSync(path, { recursive: true })
    cb(null, path);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload =  multer({ storage: storage }).array("file");
const {
  addContent
} = require("../controllers/chapireController");

router.post("/cours/:coursId/chapitres/:chapitreId/content", upload, addContent);

module.exports = router;