const { model, Schema } = require("mongoose");

const TournamentSchema = new Schema({
    matches: [{
        type: Schema.Types.ObjectId,
        ref: "matches",
    }]
});



module.exports = model("tournaments", TournamentSchema);
