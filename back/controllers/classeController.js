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
        Classe.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, classe) => {
            if(err){
            res.json({
              error: err.message
            })
          }
          res.json(classe);        
        })
    }
      catch(err){
        res.json({
          error: err.message
        })
      }
})
const addStudentToClasse = asyncHandler(async (req, res) => {
    try{
        let classe = await Classe.findById(req.body.coursId);
        let student = await User.findById(req.body.studentId);
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
        let classe = await Classe.findById(req.body.coursId);
        let cours = await Cours.findById(req.body.coursId);
        classe.cours.push(cours);
        classe = await classe.save();
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
    addCoursToClasse
};