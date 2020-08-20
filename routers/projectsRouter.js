const express = require('express');

const projectsDB = require("../data/helpers/projectModel");

const actionsDB = require("../data/helpers/actionModel");

const {validateProjectId} = require("../middleware/projects");

const router = express.Router();

// get all projects
/*router.get("/", async(req, res, next) =>{
    try {
        const projects = await projectsDB.get();
        res.status(201).json(projects);
    }catch(err){
        next(err);
    }
})*/

// get project by id
router.get("/:id", async(req, res, next) =>{
    try {
        const project = projectsDB.get(req.params.id)
        if(!project) {
            res.status(404).json({message: `Invalide project id ${req.params.id}`});
        }else {
            res.status(200).json(project);
        }
    }catch(err){
        next(err);
    }
})

// get project actions
router.get("/:id/actions", async(req, res, next) =>{
    try{
        const actions = await projectsDB.getProjectActions(req.params.id);
        res.status(200).json(actions);
    }catch(err){
        next(err);
    }
})

// post a new project
router.post("/", async(req, res, next) =>{
    try {
        const project = await projectsDB.insert(req.body)
        res.status(200).json(project);
    }catch(err){
        next(err);
    }
})

// update a project
router.put("/:id", async(req, res, next) => {
    try{
        const project = await projectsDB.update(req.params.id, req.body);
        res.status(200).json(project);
    }catch(err){
        next(err);
    }
})

// remove a project
router.delete("/:id", async(req, res, next) => {
    try {
        const project = await projectsDB.remove(req.params.id);
        if(project) { res.status(200).json({message : "Project removed"})}
    }catch(err){
        next(err);
    }
})




module.exports = router;

