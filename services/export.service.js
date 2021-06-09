const { PracticeQuestion } = require("../models/practice_questions.js");
const { Level } = require("../models/levels.js");
const { jsonReader } = require('../helpers/utils_fct');

module.exports = {
    exportPractice: async () => {
        let questions = [];
        const practice_questions = await PracticeQuestion.find().exec();
        for( let i=0; i< practice_questions.length;i++){
            var aux = await jsonReader(practice_questions[i].question_source);
            questions.push(aux);
        }
        return questions;
    },

    exportLevels: async () => {
        let levels = [];
        const allLevels = await Level.find().exec();
        for( let i=0; i< allLevels.length;i++){
            var aux = await jsonReader(allLevels[i].level_source);
            levels.push(aux);
        }
        return levels;
    }

}
