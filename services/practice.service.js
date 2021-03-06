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
    getAllQuestions: async () =>{
        return await PracticeQuestion.find().exec();
    },

    checkAnswer: async (question_id, answer_value) => {
        const question = await getQuestionById(question_id);
        let correct_value = "";
        let coins = question.coins;
        console.log(coins);
        correct_value = await jsonReader(question.question_source).correct_answer;
        if (correct_value == "error")
            return -1;
        else if (correct_value === answer_value) {
            console.log("I AM HERE");
            const aux = question.solved_counter;
            question.solved_counter = aux + 1;
            question.save();
            return coins;
        }
        return 0;
    }
}