require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const port   = process.env.PORT;
const db_url = process.env.DATABASE_URI;
const passport = require('passport');
const userroute = require('./src/routes/user-route')
const taskroute = require('./src/routes/task-routes')
const cors = require('cors');
mongoose.connect(db_url);
const database = mongoose.connection;

database.on('error',(error) => {
    console.log(error);
})

database.once('connected',() => {
    console.log('database connected');
})

const app = express();
app.use(express.json());
app.use(cors())
app.use(passport.initialize())


app.use('/user',userroute);
app.use('/task',taskroute);
app.listen(port,() => {
    console.log(`server started at http://localhost:${port}`);
})