const Task = require('../models/Task')

const getAllTasks = async (req,res)=>{
        try {
            const tasks = await Task.find({})
            res.status(201).json({tasks})
        } catch (error) {
            res.status(500).json({msg:error})
        }
    }

const createTask = async(req,res)=>{
    try {
        const task = await Task.create(req.body) 
        res.status(201).json({task})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const getTask = async (req,res)=>{
    try {
        const task = await Task.findOne({_id:req.params.id})
        if(!task){
            return res.status(404).json({msg:`No task with id:${req.params.id}`})
        }
        res.status(201).json({task})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const updateTask = async(req,res)=>{
    const cmp = req.body.completed
    const nm = req.body.name
    try {
        const task = await Task.findOneAndUpdate({_id:req.params.id},{completed:cmp,name:nm},{new:true,runValidators:true})
        console.log(req.params.id, cmp)
        if(!task){
            return res.status(404).json({msg:`No task with id ${req.params.id}`})
        }
        res.status(201).json({task})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const deleteTask = async(req,res)=>{
    try {
        const {id:taskId} = req.params
        const task = await Task.findOneAndDelete({_id:taskId})
        if(!task){
            return res.status(404).json({msg:`No task with Id${taskId}`})
        }
        res.status(200).json({task})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

module.exports = {getAllTasks,createTask,getTask,updateTask,deleteTask}