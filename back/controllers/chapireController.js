const asyncHandler = require("express-async-handler");
const Chapitre = require("../models/chapitreModel");
const Cours = require("../models/coursModel");
var mongoose = require('mongoose');
const CreateChapitre = asyncHandler(async (req, res) => {
  try{
    const {title, coursId} = req.body;
    const chapitre = new Chapitre({
      title,
      content: []
    });
    await chapitre.save();
    let cours = await Cours.findById(coursId);
    cours.chapitres.push(chapitre._id);
    await cours.save()
    res.json(chapitre);
  }
  catch(err){
    res.json({
      error: err.message
    })
  }
});

const deleteChapitre = asyncHandler(async (req, res) => {
    try{
        const chapitre = await Chapitre.findById(req.params.id);
        if(chapitre){
            await Chapitre.deleteOne({_id: req.params.id});
            return res.json({message: "Chapitre deleted"});
        }
        else{
            res.status(404);
            throw new Error("Chapitre not found");
        }
    }
    catch(err){
      res.status(500).json({
        error: err.message
      })
    }
  });

  const updateChapitre = asyncHandler(async (req, res) => {
    try{
        const chapitre = await Chapitre.findById(req.params.id);
        if(chapitre){
            chapitre.title = req.body.title;
            await chapitre.save();
            return res.json(chapitre);
        }
        else{
            res.status(404);
            throw new Error("Chapitre not found");
        }
    }
    catch(err){
      res.json({
        error: err.message
      })
    }
});

const getChapitre = asyncHandler(async (req, res) => {
    try{
    const chapitre = await Chapitre.findById(req.params.chapitreId);
    if(chapitre){
      res.json(chapitre);
    }
    else{
      res.status(404);
      throw new Error("Chapitre not found");
    }
  }
  catch(err){
    res.json({
      error: err.message
    })
  }
})

const deleteContent = asyncHandler(async (req, res) => {
    try{
      const chapitre = await Chapitre.findById(req.params.chapitreId);
      for(let i = 0; i < chapitre.content.length; i++){
        if(chapitre.content[i]._id == req.params.contentId){
          chapitre.content.splice(i, 1);
          await chapitre.save();
          return res.status(200).json(chapitre);
        }
      }
     res.status(404);
     throw new Error("Content not found");
    }
  catch(err){
    res.json({
      error: err.message
    })
  }
})

const addContent = asyncHandler(async (req, res) => {
    try{
    const chapitre = await Chapitre.findById(req.params.chapitreId);
    chapitre.content.push({
      _id: new mongoose.Types.ObjectId(),
      type: req.body.type,
      description: req.body.description,
      //only file names
      files: req.files.map(file => file.filename)
    });
    await chapitre.save();
    res.status(200).json(chapitre);
  }
  catch(err){
    res.json({
      error: err.message
    })
  }
})

const getContent = asyncHandler(async (req, res) => {
  try{
    const chapitre = await Chapitre.findById(req.params.chapitreId);
    if(chapitre){
      for(let i = 0; i < chapitre.content.length; i++){
        if(chapitre.content[i]._id == req.params.contentId){
          return res.json(chapitre.content[i]);
        }
      }
      res.status(404);
      throw new Error("Content not found");
    }
    else{
      res.status(404);
      throw new Error("Chapitre not found");
    }
  }
  catch(err){
    res.json({
      error: err.message
    })
  }
})

const updateContent = asyncHandler(async (req, res) => {
  try{
    const chapitre = await Chapitre.findById(req.params.chapitreId);
    for(let i = 0; i < chapitre.content.length; i++){
      if(chapitre.content[i]._id == req.params.contentId){
        chapitre.content[i].type = req.body.type;
        chapitre.content[i].description = req.body.description;
        chapitre.content[i].files = req.files.map(file => file.filename);
        await chapitre.save();
        return res.json(chapitre.content[i]);
      }
    }
    res.status(404);
    throw new Error("Content not found");
  }
  catch(err){
    res.json({
      error: err.message
    })
  }
})

module.exports = {
    updateChapitre,
    CreateChapitre,
    addContent,
    deleteContent,
    deleteChapitre,
    getContent,
    updateContent
};