const mongoose = require('mongoose')
const { Schema } = mongoose;

const LaundryRoom = new Schema({
    name: String,
    humanname: String,
    washermachines: Number,
    dryermachines: Number,
    washeravailable: Number,
    dryeravailable: Number,
    washeravailable_percent: Number,
    dryeravailable_percent: Number,
    washers: {
        type: [{
            machinenumber: Number,
            status: {
                type: String,
                enum: ['Available', 'Ready To Start', 'In Use', 'Almost Done', 'Ready For Pickup', 'Offline'],
                default: 'Available'
            },
            rawstatus: String,
            minutes_left: Number
        }]
    },
    dryers: {
        type: [{
            machinenumber: Number,
            status: {
                type: String,
                enum: ['Available', 'Ready To Start', 'In Use', 'Almost Done', 'Ready For Pickup', 'Offline'],
                default: 'Available'
            },
            rawstatus: String,
            minutes_left: Number
        }]
    }
})

module.exports = {
    model: mongoose.model('LaundryRoom', LaundryRoom),
    schema: LaundryRoom
}