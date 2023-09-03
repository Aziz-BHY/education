const express = require("express");
const router = express.Router();
const {verfiyPermission} = require("../middlewares/permission");

const {
    downloadFile
} = require("../controllers/fileController");

router.get("/", downloadFile);

module.exports = router;