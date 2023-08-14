const asyncHandler = require("express-async-handler");
const fs = require("fs");

const getFolder = asyncHandler(async (req, res) => {
  try{
    let path ;
    req.query.path ? path = "./uploads/students/"+req.params.studentId+"/"+req.query.path : path = "./uploads/students/"+req.params.studentId;
    fs.readdir(path, async (err, files) => {
      if (err) {
        res.status(500).json({
          error: err.message
        })
      
      }
      let response = []
      for(let file of files){
        response.push({
          item: file,
          isDirectory: await fs.lstatSync(path+"/"+file).isDirectory()
        })
      }
      res.json(response);
    });
  }
  catch(err){
    res.json({
      error: err.message
    })
  }
});

const deleteFile = asyncHandler(async (req, res) => {
  try{
    if(!req.query.path){
      return res.json({
        error: "path is required"
      })
    }
    let path = "./uploads/students/"+req.params.studentId+"/"+req.query.path
    if(await fs.lstatSync(path).isDirectory()){
      await fs.rmSync(path, { recursive: true });
      res.json("folder deleted");
    }else{
      fs.rm(path, (err) => {
        if (err) {
          res.status(500).json({
            error: err.message
          })
        
        }
        res.json("file deleted");
  
      })
    }
    
  }
  catch(err){
    res.json({
      error: err.message
    })
  }
});

const createFolder = asyncHandler(async (req, res) => {
  try{
    let path = "./uploads/students/"+req.params.studentId+"/"+req.body.path+"/"+req.body.folder
    await fs.mkdirSync(path);
    console.log(path)
    res.json("folder created")
  }
  catch(err){
    res.json({
      error: err.message
    })
  }
});

const createFile = asyncHandler(async (req, res) => {
  try{
    console.log(req.body)
    res.json("file created")
  }
  catch(err){
    res.json({
      error: err.message
    })
  }
});

module.exports = {
    getFolder,
    deleteFile,
    createFile,
    createFolder
};