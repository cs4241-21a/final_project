const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  id: { 
    type: String,
    required: true,
    default: ObjectId().str
  },
  task_text: {
      type: String,
      required: true,
      min: 1,
      max: 200
  },
  due_text: {
      type: String,
      required: true,
      min: 1,
      max: 200
  },
  edit_checkbox: {
      type: Boolean,
      required: true,
      default: false
  },
  parent: {
      type: String,
      required: true,
      default: ""
  }
});

module.exports = mongoose.model('Task', taskSchema);
