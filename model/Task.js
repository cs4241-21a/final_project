const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
id: { 
    type: String,
    required: true,
    default: "ObjectId().str"
  },
    username: {
        type: String,
        required: true,
        max: 200,
        min: 3
    },
    task:{
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    due:{
        type: String,
        required: true,
        max: 1024,
    },
    check:{
        type: Boolean,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now
    },
    parent: {
        type: String,
        required: true,
        default: ""
    }
});

module.exports = mongoose.model('Task', taskSchema);

