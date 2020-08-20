const express = require('express');

const projectsDB = require("../data/helpers/projectModel");

const actionsDB = require("../data/helpers/actionModel");

const {validateProjectId} = require("../middleware/projects");

const router = express.Router();

/*router.get("/", async(req, res, next) =>{

})*/

// get action by id
router.get("/:id", async(req, res, next) =>{
    try {
        const action = await actionsDB.get(req.params.id)
        if(!action) {
            res.status(404).json({message: `action with id:${req.params.id} not found`})
        }else {
            res.status(200).json(action);
        }
    }catch(err){
        next(err);
    }
})

// post a new action
router.post("/", async(req, res, next) =>{
    try {
        const action = await actionsDB.insert(req.body)
        res.status(200).json(action);
    }catch(err){
        next(err);
    }
})

// update an action
router.put("/:id", async(req, res, next) => {
    try {
        const action = actionsDB.update(req.params.id, req.body)
        res.status(201).json(action);
    }catch(err){
        next(err);
    }
})

// remove an action
router.delete("/:id", async(req, res, next) => {
    try {
        const action = await actionsDB.remove(req.params.id)
        if(action){ res.status(200).json({message: "actions removed"})}
    }catch(err){
        next(err);
    }
})

module.exports = router;
