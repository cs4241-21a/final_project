const { model, Schema } = require("mongoose");

const MatchSchema = new Schema({
    team1: {
        type: String,
    },
    champions1: [{
        type: String,
    }],
    team2: {
        type: String,
    },
    champions2: [{
        type: String,
    }],
    
});



module.exports = model("matches", MatchSchema);
