const { Level } = require("../models/levels.js");
const { UserData } = require("../models/user_data.js");
const { refreshLedearboard } = require("./leaderboard.service.js");
const { updateUserData } = require("./user.service.js");

async function getLevelData(level_id){
    const level = await Level.findOne({ id: level_id }).exec();
    return level;
}

module.exports = {
    getLevelData,
    clickHint: async (user_id, coins) => {
         await updateUserData("coins", user_id,coins);
    },
    submit: async (level_id, user_id) => {
        const level = await getLevelData(level_id);
        const user = await UserData.findOne({ id: user_id }).exec();
        const aux = level.solved_counter;
        level.solved_counter=aux+1;
        level.save();
        if(user.current_level == level_id){
            const auxXP = user.xp;
            user.xp = auxXP+level.xp;
            user.current_level++;
            user.save();
            await refreshLedearboard(auxXP+level.xp);
        }
    }
}
