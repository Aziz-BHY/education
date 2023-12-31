const asyncHandler = require("express-async-handler");
const Classe = require("../models/classeModel");
const User = require("../models/userModel")
const Cours = require("../models/coursModel")
const createClasse = asyncHandler(async (req, res) => {
  try{
    const { name } = req.body;
    const classe = await Classe.create({
      name,
      cours: [], 
      students: []
    });
    res.json(classe);
  }
  catch(err){
    res.json({
      error: err.message
    })
  }
});

const deleteClasse = asyncHandler(async (req, res) => {
    try{
        const classe = await Classe.findByIdAndDelete(req.params.id);
        res.json(classe);
      }
      catch(err){
        res.json({
          error: err.message
        })
      }
})

const updateClasse = asyncHandler(async (req, res) => {
    try{
        let classe = await Classe.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.json(classe);
    }
      catch(err){
        res.json({
          error: err.message
        })
      }
})
const addStudentToClasse = asyncHandler(async (req, res) => {
    try{
        let classe = await Classe.findById(req.body.classe);
        let student = await User.findById(req.body.student);
        classe.students.push(student);
        classe = await classe.save();
        res.json(classe);
      }
      catch(err){
        res.json({
          error: err.message
        })
      }
})
const addCoursToClasse = asyncHandler(async (req, res) => {
    try{
        let classe = await Classe.findById(req.body.classe);
        let cours = await Cours.findById(req.body.cours);
        classe.cours.push(cours);
        classe = await classe.save();
        res.json(classe);
      }
      catch(err){
        res.json({
          error: err.message
        })
      }
})
const getClasse = asyncHandler(async (req, res) => {
  try{
    const classe = await Classe.findById(req.params.id).populate("students", ["_id", "name", "email"]).populate("cours", ["_id", "name"]).exec();
    res.json(classe)
  }
  catch(err){
    res.json({
      error: err.message
    })
  }
})

const getClasses = asyncHandler(async (req, res) => {
  try{
    const classes = await Classe.find();
    res.json(classes);
  }
  catch(err){
    res.json({
      error: err.message
    })
  }
})

const deleteStudentFromClasse = asyncHandler(async (req, res) => {
  try{
    let classe = await Classe.findById(req.body.classe);
    classe.students.pull(req.body.student);
    classe = await classe.save();
    res.json(classe);
  }
  catch(err){
    res.json({
      error: err.message
    })
  }
})

const deleteCoursFromClasse = asyncHandler(async (req, res) => {
  try{
    let classe = await Classe.findById(req.body.classe);
    classe.cours.pull(req.body.classe);
    classe = await classe.save();
    res.json(classe);
  }
  catch(err){
    res.json({
      error: err.message
    })
  }
})
module.exports = {
    createClasse,
    deleteClasse,
    updateClasse,
    addStudentToClasse,
    addCoursToClasse,
    getClasse,
    getClasses,
    deleteCoursFromClasse,
    deleteStudentFromClasse
}