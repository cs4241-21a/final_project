const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({
  id: { 
    type: String,
    required: True,
    default: ObjectId().str
  },
  task_text: {
      type: String,
      required: True,
      min: 1,
      max: 200
  },
  due_text: {
      type: String,
      requred: True,
      min: 1,
      max: 200
  },
  edit_checkbox: {
      tyep: Boolean,
      requried: True,
      default: False
  },
  parent: {
      type: String,
      required: True,
      default: ""
  }
});

module.exports = mongoose.model('Task', taskSchema);
