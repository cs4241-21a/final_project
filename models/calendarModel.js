const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const calendarSchema = new Schema({
    owner:{
        type:String,
        required: true
    },
    eventName: {
        type: String,
        required: true
    },
    EventDate: {
        type: Date,
        required: false
    },
    StartTime: {
        type: Number,
        required: false
    },
    meetingDuration:{
        type: Number,
        required: true
    },
    location:{
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },

}, {timestamps: true });

const EventEntry = mongoose.model('calendar', eventSchema);
module.exports = EventEntry;
