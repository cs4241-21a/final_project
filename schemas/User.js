const { model, Schema } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true
        },
        passwordHash: {
            type: String
        }
    }
);

// for referencing other docs
// owner: {
//     type: Schema.Types.ObjectId,
//     ref: 'users'
// }

module.exports = model('users', UserSchema);