

const TaskModel = require('../models/task.model')
const express = require('express');
const passport = require('../config/passport-jwt');
const router = express.Router();
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
 
router.post('/savetask',passport.authenticate('jwt',{session:false}),async (req,res) => {
    const existingtask = await TaskModel.findOne({title:req.body.title})
    console.log(req.body);
    if(existingtask){
        return res.status(400).json({
            success:false,
            message:"task already exists."
        })
    }
    const task = new TaskModel({
        title:req.body.title,
        description:req.body.description,
        userId:req.user._id
    })

    try {
        const savedTask = await task.save();
        if(savedTask){
            res.send({
                success:true,
                message:"task sved successfully.",
                task:savedTask
            }) 
        }
    } catch (error) {
        res.send({
            success:false,
            error:error
        })
    }
})


router.post('/edittask',passport.authenticate('jwt',{session:false}),(req,res) => {
    const taskid = req.body._id;
    const updateddata = {
        title:req.body.title,
        description:req.body.description
    }

    TaskModel.findByIdAndUpdate(
        taskid,
        updateddata,
        {new:true},
    ).then((result) => {
        res.send({
            success:true,
            data:result
        })
        console.log(result);
    }).catch((error) => {
        res.send({
            success:false,
            error:error
        })
    })

})
router.post('/deletetask',passport.authenticate('jwt',{session:false}),(req,res) => {
    const taskid = req.body._id;
    console.log(req.body);
    TaskModel.findByIdAndDelete(taskid)
    .then((result)=> {  
        res.send({
            success:true,
            message:'successfully deleted.'
        })
        console.log(result);
    }).catch((error) => {
        res.send({
            success:false,
            message:'error occured.',
            error:error
        })
    })
})
router.get('/gettasks',passport.authenticate('jwt',{session:false}),(req,res) => {
    const userId = req.user._id;
    TaskModel.find({userId}).exec().then((result) => {
        res.send({
            success:true,
            tasks:result
        });
    }).catch((error)=> {
        res.status(500).send({
            success:false,
            message:"error occured",
            error:error
        })
    })
    
})



module.exports = router;
