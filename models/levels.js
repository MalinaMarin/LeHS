const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LevelsSchema = new Schema({
  id: {
    type: Number,
    enum:[1,2,3,4,5,6,7,8,9,10],
    unique:true,
    required: true
  },
  level_source: {
    type: String,
    required: true
  },
  xp: {
    type: Number,
    required: true
  },
  hint_cost:{
    type: Number,
    required: true
  },
  solved_counter:{
    type: Number,
    required: true
  }
});

const Level = mongoose.model('levels', LevelsSchema);
module.exports = {Level};