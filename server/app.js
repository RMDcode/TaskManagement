require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const task=require('./routes/task');//this for task
const mongoose=require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');


mongoose.connect('mongodb+srv://Rohit:Rohit1223@Cluster0.kyolsu7.mongodb.net/TaskManagement?retryWrites=true&w=majority')
.catch (error => console.log("DB is not connected"));

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});



app.use(express.static(path.join(__dirname, 'dist')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());
app.use(cors());
//app.use('/api', api);
app.use('/Task', task);

app.listen(port, ()=>{
    console.log("Task Management : Server running on localhost:" + port);
});

app.get('/',(req,res)=>{

    res.send("Welcome to Task Management server");
});
