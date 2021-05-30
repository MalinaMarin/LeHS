const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PracticeQuestionsSchema = new Schema({
  id: {
    type: Number,
    unique:true,
    required: true
  },
  question_source: {
    type: String,
    required: true
  },
  coins: {
    type: Number,
    required: true
  },
  difficulty:{
      type: String,
      enum:[BEGINNER, INTERMEDIATE, EXPERT],
      required: true
  }
});

const PracticeQuestion = mongoose.model('practice_questions', PracticeQuestionsSchema);
module.exports = PracticeQuestion;