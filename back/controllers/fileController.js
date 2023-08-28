const asyncHandler = require("express-async-handler");


const downloadFile = asyncHandler(async (req, res) => {
    try{
        res.download("./uploads/"+req.query.path);
    }
    catch(err){
      res.json({
        error: err.message
      });
    }
  });

module.exports = {
    downloadFile
};