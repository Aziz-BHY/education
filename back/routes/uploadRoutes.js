const express = require("express");
const router = express.Router();
const multer  = require('multer')
const fs = require('fs');

const storageCours = multer.diskStorage({
  destination: function (req, file, cb) {
    let path = `./uploads/cours/${req.params.coursId}/chapitres/${req.params.chapitreId}/`
    fs.mkdirSync(path, { recursive: true })
    cb(null, path);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const uploadCours =  multer({ storage: storageCours }).array("file");

const storageStudent = multer.diskStorage({
  destination: function (req, file, cb) {
    let path = `./uploads/students/${req.params.studentId}/${req.query.path}`
    fs.mkdirSync(path, { recursive: true })
    cb(null, path);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const uploadStudent =  multer({ storage: storageStudent }).single("file");

const {
  addContent,
  updateContent
} = require("../controllers/chapireController");
const {
 getFolder,
 deleteFile,
 createFile,
 createFolder
} = require("../controllers/espaceController")

router.post("/cours/:coursId/chapitres/:chapitreId/content", uploadCours, addContent);
router.put("/cours/:coursId/chapitres/:chapitreId/content/:contentId", uploadCours, updateContent);
router.get("/student/:studentId", getFolder);
router.delete("/student/:studentId", deleteFile);
router.post("/student/:studentId/file", uploadStudent, createFile);
router.post("/student/:studentId/folder", createFolder);

module.exports = router;