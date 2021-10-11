const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    owner:{
        type:String,
        required: true
    },
    eventName: {
        type: String,
        required: true
    },
    chosenEventDate: {
        type: Date,
        required: false
    },
    availableDates:{
        type: [],
        required: true
    },
    availableTimes:{
        type: [],
        required: true
    },
    chosenStartTime: {
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
    attendees: {
        type: [],
        required: true
    },
    attendeesAvailability: {
        type: [],
        required: true
    }

}, {timestamps: true });

const EventEntry = mongoose.model('event', eventSchema);
module.exports = EventEntry;
