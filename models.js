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
module.exports = {
    User: userModel,
};
