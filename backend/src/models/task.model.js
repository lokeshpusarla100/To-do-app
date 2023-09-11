const mongoose = require('mongoose');


const taskSchema = mongoose.Schema({
    title:String,
    description:String,
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
})

const TaskModel =  mongoose.model('Task',taskSchema);
module.exports = TaskModel;