const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    task: {type: String}
}, { timestamps: true });

module.exports = mongoose.model('tasks', userSchema);
