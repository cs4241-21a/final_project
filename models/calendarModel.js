const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const calendarSchema = new Schema({
    username:{
        type:String,
        required: true
    },
    eventName: {
        type: String,
        required: true
    },
    recurring: {
        type: Boolean,
        required: true
    },
    startDateTime: {  //used for non recurring events
        type: String,
        required: false
    },
    endDateTime: {   //used for non recurring events
        type: String,
        required: false
    },
    startTime: {
        type: String,    //used for recurring events
        required: false
    },
    endTime: {    //used for recurring events
        type: String,
        required: false
    },
    startDate:{    //used for recurring events
        type: String,
        required: false
    },
    endDate:{    //used for recurring events
        type: String,
        required: false
    },
    daysOfWeek:{
        type: Array,
        required: false
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

const CalendarEntry = mongoose.model('calendar', calendarSchema);
module.exports = CalendarEntry;
