const { UserData } = require("../models/user_data.js");
const { PracticeQuestion } = require("../models/practice_questions.js");
const { jsonReader } = require('../helpers/utils_fct');

module.exports = {
    getQuestionById: async question_id => {
        const question = await PracticeQuestion.findOne({ id: question_id }).exec();
        return question;
    },

    updateQuestion: (column_name, current, new_data) => {
        PracticeQuestion.findOne({ [column_name]: current }, function (err, doc) {
            doc[column_name] = new_data;
            doc.save();
        });
    },

    checkAnswer: (question_id, answer_value) => {
        const question = this.getQuestionById(question_id);
        let correct_value;
        jsonReader(question.question_source, (err, question_data) => {
            if (err) {
                console.log(err)
                return;
            }
            correct_value = question_data.correct_answer;
        })
        if (correct_value == answer_value){
            const aux = question.solved_counter;
            question.solved_counter = aux + 1;
            question.save();
            return questions.coins;
        }
        return null;

    },
    submitAnswer: (data, callback) => {
        const coins = this.checkAnswer(data.question_id, data.answer_value)
        if ( coins == null)
            return false;
        else {
            const user = UserData.getU
        }
    }
}