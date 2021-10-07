const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    eventName: {
        type: String,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    availableTimes:{
        type: [],
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
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
    attendees: {
        type: [],
        required: true
    }

}, {timestamps: true });

const EventEntry = mongoose.model('event', eventSchema);
module.exports = EventEntry;
