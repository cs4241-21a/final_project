const mongoose = require('mongoose')
const { Schema } = mongoose;

// Timestamp is floored to the minute
const Timestamp = new Schema({
    name: String,
    timestamp: Number
})

module.exports = {
    model: mongoose.model('Timestamp', Timestamp, 'laundryrooms'),
    schema: Timestamp
}