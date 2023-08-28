const express = require("express");
const router = express.Router();

const {
    downloadFile
} = require("../controllers/fileController");

router.route("/").get(downloadFile);

module.exports = router;