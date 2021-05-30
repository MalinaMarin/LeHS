const mongoose = require("mongoose");
const UserData = require("./user_data");

const Schema = mongoose.Schema;

const LeaderboardSchema = new Schema({
  id: {
    type: Number,
    enum:[1,2,3,4,5,6,7,8,9,10],
    unique:true,
    required: true
  },
  player: {
    type: UserData,
    required: true
  }
});

const Leaderboard = mongoose.model('leaderboard', LeaderboardSchema);
module.exports = Leaderboard;