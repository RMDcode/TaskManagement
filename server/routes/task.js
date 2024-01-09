const router = require('express').Router();
const { MongoClient } = require('mongodb');
const User = require('../models/user');
const { ObjectId } = require('mongodb');

const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

const db = "mongodb+srv://Rohit:Rohit1223@Cluster0.kyolsu7.mongodb.net/TaskManagement?retryWrites=true&w=majority";
const client = new MongoClient(db);

// Connect to the database
async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected to the database");
    } catch (err) {
        console.error("Error connecting to the database:", err);
    }
}

// Call this function to connect to the database
connectToDatabase();

router.get('/TaskAdded', (_req, res) => {
    res.send("Welcome to Task ...");
});

router.post('/TaskAdded', async (req, res) => {
    const tasks = new User({
        task: req.body.task
    });

    try {
        await tasks.save();
        res.json({ success: true, message: "Your details have been submitted" });
    } catch (err) {
        res.json({ success: false, message: "Your details have been denied!!!!" });
        console.error(err);
    }
});

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-with,Content-Type,Accept");
    next();
});

// GET all tasks
router.get('/Tasks', Taskmanagement);

async function Taskmanagement(req, res) {
    let db = client.db("TaskManagement");
    let collection = db.collection("tasks");
    let res1 = await collection.find({}).toArray();
    res.send(res1);
}

// DELETE a task by ID
router.delete('/TaskAdded/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        console.log("Received request to delete task with ID:", taskId);
        // Validate that taskId is a valid ObjectId
        if (!isValidObjectId(taskId)) {
            return res.status(400).json({ success: false, message: "Invalid ObjectId format" });
        }

        const db = client.db("TaskManagement");
        const collection = db.collection("tasks");
        const deletedTask = await collection.deleteOne({ _id: new ObjectId(taskId) });

        // Handle the response after deleting the task
        if (deletedTask.deletedCount === 1) {
            res.json({ success: true, message: "Task deleted successfully" });
        } else {
            res.json({ success: false, message: "Task not found or could not be deleted" });
        }
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: "Error deleting task" });
    }
});

// UPDATE a task by ID
router.put('/TaskAdded/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const newData = req.body;

        const db = client.db("TaskManagement");
        const collection = db.collection("tasks");
        
        const updatedTask = await collection.findOneAndUpdate(
            { _id: new ObjectId(taskId) },
            { $set: newData },
            { returnDocument: 'after' }
        );

        if (updatedTask.value) {
            res.json({ success: true, message: "Task updated successfully", updatedTask: updatedTask.value });
        } else {
            res.json({ success: false, message: "Task not found or could not be updated" });
        }
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: "Error updating task" });
    }
});

router.post('/login', (req, res) => {
    res.json("Login Work");
});

module.exports = router;
