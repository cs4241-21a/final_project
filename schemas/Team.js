const { model, Schema } = require("mongoose");

const TeamSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
    teamName: {
        type: String,
        required: true,
    },
    summoners: [
        {
            type: String,
        },
    ],
    idList: [ {
        type: String,
    }, ],
});



module.exports = model("teams", TeamSchema);
