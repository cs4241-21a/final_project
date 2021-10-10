const mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const taskSchema = new mongoose.Schema({
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
        default: ""
    }
});

taskSchema.virtual('categoryId').get(function() {
    return this._id
})

module.exports = mongoose.model('Task', taskSchema);

