const { UserData } = require("../models/user_data.js");
const { PracticeQuestion } = require("../models/practice_questions.js");
const { jsonReader } = require('../helpers/utils_fct');

async function getQuestionById(question_id) {
    const question = await PracticeQuestion.findOne({ id: question_id }).exec();
    return question;
}

module.exports = {

    updateQuestion: (column_name, current, new_data) => {
        PracticeQuestion.findOne({ [column_name]: current }, function (err, doc) {
            doc[column_name] = new_data;
            doc.save();
        });
    },

    checkAnswer: async (question_id, answer_value) => {
        const question = await getQuestionById(question_id);
        let correct_value = "";
        let coins = question.coins;
        console.log(coins);
        correct_value = await jsonReader(question.question_source).correct_answer;
        //     , (err, question_data) => {
        //     if (err) {
        //         console.log(err)
        //         return "error";
        //     }
        //     console.log(typeof question_data.correct_answer);
        //     return question_data.correct_answer;

        // })
        if (correct_value == "error")
            return -1;
        else if (correct_value === answer_value) {
            console.log("I AM HERE");
            const aux = question.solved_counter;
            question.solved_counter = aux + 1;
            question.save();
            return coins;
        }
        // else {
        //     console.log(correct_value);
        //     console.log(answer_value);
        // }
        return 0;

    }
    //     submitAnswer: (data, callback) => {
    //         // const coins = this.checkAnswer(data.question_id, data.answer_value)
    //         // if ( coins == null)
    //         //     return false;
    //         // else {
    //         //     const user = UserData.getU
    //         // }
    //     }
}