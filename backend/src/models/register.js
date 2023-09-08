const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email:String,
    name:String,
    phone:String,
    password:String
})

const UserModel = mongoose.model('User',userSchema);
module.exports = UserModel;