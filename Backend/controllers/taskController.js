const mongoose = require("mongoose");
const TaskModel = require("../models/TaskModel");


//to create a task 
const createTask = async (req,res) =>{
    const {title,description} = req.body;

    try {
        const task = await TaskModel.create({title,description});
        res.status(200).json(task);
    } catch (e){
        res.status(400).json({ error: e.message});
    }
};

// to get all tasks

const getTasks = async (req, res) =>{
    try{
        const tasks = await TaskModel.find({});
        res.status(200).json(tasks);
    } catch (e) {
        res.status(400).json({error: e.message});
    }
};

// to get a single Task - get
const getSingleTask =   async (req,res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Task not found'})
    }
    try{
        const singleTask = await TaskModel.findById(id)
        res.status(200).json(singleTask)
    } catch (e) {
        res.status(400).json({error: e.message});
    }
    
};

//to update a task -patch
const updateTask = async (req,res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Task not found'})
    }

    try{

        const task = await TaskModel.findByIdAndUpdate({
 _id:id
        },
    {
        ...req.body
    });
    res.status(200).json(task)

    } catch (e){
        res.status(400).json({ error: e.message});

    }

};

//delete task 

const deleteTask =async (req,res) => {
    const {id} =req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Task not found'})
    }

    try{
        const task = await TaskModel.findByIdAndDelete(id);
        res.status(200).json(task)

    } catch (e) {
        res.status(400).json({ error: e.message});

    }

};

module.exports = {createTask, getTasks, getSingleTask, updateTask , deleteTask};