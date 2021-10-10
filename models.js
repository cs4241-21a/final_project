const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = mongoose.Schema({
        username: {type: String, required: false},
        password: {type: String, required: false},
        githubId: {type: String, required: false}
    },
    {versionKey: false});
userSchema.plugin(findOrCreate);
const userModel = mongoose.model('memoe', userSchema, 'memoe_accounts');



const watchSchema = mongoose.Schema(
    {
        title:{type: String },
        category: {type: String},
        score: {type: String},
        date: {type: String},
        review: {type: String},
        user: {type: String}
    },
    {versionKey: false}
);

const watchModel = mongoose.model('watchlist', watchSchema, 'watchlists');

module.exports = {
    User: userModel,
    watchlist: watchModel
};
