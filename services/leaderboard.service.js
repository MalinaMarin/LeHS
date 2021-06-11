const { UserData } = require("../models/user_data.js");
const { PracticeQuestion } = require("../models/practice_questions.js");
const { Leaderboard } = require("../models/leaderboard.js");

module.exports = {

    getTop10: async () => {
        const user_array = await UserData.find().sort({ xp: -1 }).limit(10).exec();
        return user_array;
    },
    refreshLedearboard: async (xp) => {
        const last = await Leaderboard.findOne({ id: 10 }).exec();
        let leaderboard = await Leaderboard.find().exec();
        console.log(last);
        if (last.xp <= xp) {
            const array = await this.getTop10();
            console.log(array);
            for (let index = 0; index < 10; index++) {
                leaderboard[index].player = array[index];
            }
            leaderboard.save();
        }
    },
    getLeaderboardService: async () => {
        const leaderboard = await Leaderboard.find().exec();
        return leaderboard;
    },

    getRank: async (xp) => {
        const rank = await UserData.count({ "xp": { "$gt": xp } }).exec() + 1;
        return rank;
    },

    getNumberOfPlayers: async () => {
        return await UserData.count().exec();
    },

    getDifficultyStatsPerUser: async (practice_questions_solved, difficulty) => {
        const howMany = await PracticeQuestion.count({ "difficulty": difficulty }).exec();
        let counter = 0;
        for (let i = 0; i < practice_questions_solved.length; i++){
            var question = await PracticeQuestion.findOne({ id:practice_questions_solved[i] }).exec();
            if(question.difficulty == difficulty)
                counter++;
        }
        return counter/howMany*100;
    },
    getGeneralDifficultyStats: async difficulty => {
        const questions = await PracticeQuestion.find({ "difficulty": difficulty }).exec();
        const howManyQuestions = questions.length;
        let solvedQuestions = 0;
        for(let i=0; i<howManyQuestions;i++){
            solvedQuestions+=questions[i].solved_counter;
        }
        const howManyUsers = await UserData.count().exec();
        var percentage = solvedQuestions*100/(howManyQuestions*howManyUsers);

        return percentage;

    },

    getGeneralLevelStats: async level => {
        const users = await UserData.count({ "current_level": { "$gt": level } }).exec();

        return users;
    }

}