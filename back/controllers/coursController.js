const asyncHandler = require("express-async-handler");
var jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Cours = require("../models/coursModel");

const createCours = asyncHandler(async (req, res) => {
  try{
    const {name,  description, teacher} = req.body;
    if(!name || !description){
      res.status(400);
      throw new Error("Please add all fields");
    }
    const cours = await Cours.create({
        name: name,
        description: description,
        teacher: teacher? teacher : null,
        students: [],
        chapitres: []
    });
    res.json(cours);
  
  }
  catch(err){
    res.json({
      error: err.message
    })
  }
});

const updateCours = asyncHandler(async (req, res) => {
    try{
      const {name,  description} = req.body;
      if(!name || !description){
        res.status(400);
        throw new Error("Please add all fields");
      }
      const cours = await Cours.findById(req.params.id);
      if(!cours){
        res.status(400);
        throw new Error("Cours not found");
      }
      const updatedCours = await Cours.findByIdAndUpdate(req.params.id, {
        name: name,
        description: description,
        teacher: cours.teacher,
      }, {new: true});
      res.json(updatedCours);
    }
    catch(err){
      res.json({
        error: err.message
      })
    }
});

const deleteCours = asyncHandler(async (req, res) => {
    try{
        const cours = await Cours.findById(req.params.id);
      if(!cours){
        res.status(400);
        throw new Error("Cours not found");
      }
      await cours.deleteOne({_id: req.params.id});
      res.json({
        message: "Cours removed"
      });
    }
    catch(err){
      res.json({
        error: err.message
      })
    }
});

const getCoursById = asyncHandler(async (req, res) => {
    try{
        const cours = await Cours.findById(req.params.id)
        .populate("teacher", "name email").populate("students", "name email").populate("chapitres", "title content").exec();
      if(!cours){
        res.status(400);
        throw new Error("Cours not found");
      }
      res.json(cours);
    }
    catch(err){
      res.json({
        error: err.message
      })
    }
});

const getCoursBystudentId = asyncHandler(async (req, res) => {
    try{
        const cours = await Cours.find({students: req.params.id});
      if(!cours){
        res.status(400);
        throw new Error("Cours not found");
      }
      res.json(cours);
    }
    catch(err){
      res.json({
        error: err.message
      })
    }
});

const getCours = asyncHandler(async (req, res) => {
    try{
        const cours = await Cours.find();
      if(!cours){
        res.status(400);
        throw new Error("Cours not found");
      }
      res.json(cours);
    }
    catch(err){
      res.json({
        error: err.message
      })
    }
})

const getCoursByteacherId = asyncHandler(async (req, res) => {
    try{
        const cours = await Cours.find({teacher: req.params.id});
      if(!cours){
        res.status(400);
        throw new Error("Cours not found");
      }
      res.json(cours);
    }
    catch(err){
      res.json({
        error: err.message
      })
    }
})

module.exports = {
    createCours,
    updateCours,
    getCoursById,
    getCoursBystudentId,
    deleteCours,
    getCours,
    getCoursByteacherId
};