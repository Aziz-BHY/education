const asyncHandler = require("express-async-handler");
const Chapitre = require("../models/chapitreModel");
const Cours = require("../models/coursModel");

const CreateChapitre = asyncHandler(async (req, res) => {
  try{
    const {title, coursId} = req.body;
    const chapitre = new Chapitre({
      title,
      content: []
    });
    let cours = await Cours.findById(coursId);
    cours.chapitres.push(chapitre._id);
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
        const chapitre = await Chapitre.findById(req.params.chapitreId);
        if(chapitre){
            await chapitre.remove();
            return res.json({message: "Chapitre deleted"});
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

  const updateChapitre = asyncHandler(async (req, res) => {
    try{
        const chapitre = await Chapitre.findById(req.params.chapitreId);
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
        if(chapitre.content[i] == req.params.contentId){
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
    chapitre.content.push(req.body);
    await chapitre.save();
    res.status(200).json(chapitre);
  }
  catch(err){
    res.json({
      error: err.message
    })
  }
})
module.exports = {
    CreateChapitre,
};