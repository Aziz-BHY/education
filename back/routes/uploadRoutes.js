const express = require("express");
const router = express.Router();
const multer  = require('multer')
const fs = require('fs');
const {verfiyPermission} = require("../middlewares/permission");

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

router.post("/cours/:coursId/chapitres/:chapitreId/content", [(req, res, next)=>verfiyPermission(req, res, next, ["teacher"]), uploadCours], addContent);
router.put("/cours/:coursId/chapitres/:chapitreId/content/:contentId", [(req, res, next)=>verfiyPermission(req, res, next, ["teacher"]), uploadCours], updateContent);
router.get("/student/:studentId",(req, res, next)=>verfiyPermission(req, res, next, ["student"]), getFolder);
router.delete("/student/:studentId",(req, res, next)=>verfiyPermission(req, res, next, ["student"]), deleteFile);
router.post("/student/:studentId/file", [(req, res, next)=>verfiyPermission(req, res, next, ["student"]), uploadStudent], createFile);
router.post("/student/:studentId/folder",(req, res, next)=>verfiyPermission(req, res, next, ["student"]),  createFolder);

module.exports = router;