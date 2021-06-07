const mongoose = require("mongoose");

const Schema = mongoose.Schema;
var uuid = require('uuid-random');

const UsersDataSchema = new Schema({
  id: {
    type: String,
    unique:true,
    required: true
  },
  username: {
    type: String,
    unique:true,
    required: true
  },
  //not completed yet
  current_level:{
      type: Number,
      enum:[1,2,3,4,5,6,7,8,9,10],
      required:true
  },
  practice_questions_solved:{
      type: Array
  },
  coins:{
      type:Number,
      required:true
  },
  xp:{
    type:Number,
    required:true
}
});

const UserData = mongoose.model('users_data', UsersDataSchema);
module.exports = {UserData};