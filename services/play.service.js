const { Level } = require("../models/levels.js");
const { UserData } = require("../models/user_data.js");
const { updateUserData } = require("./user.service.js");

module.exports = {
    getLevelData: async (level_id) => {
        const level = await Level.findOne({ id: level_id }).exec();
        return level;
    },

    clickHint: async (user_id, coins) => {
         await updateUserData("coins", user_id,coins);
    },
    submit: async (level_id, user_id) => {
        const level = await this.getLevelData(level_id);
        const user = await UserData.findOne({ id: user_id }).exec();
        const aux = level.solved_counter;
        level.solved_counter=aux+1;
        level.save();
        if(user.current_level == level_id){
            const auxXP = user.xp;
            user.xp = auxXP+level.xp;
            user.current_level++;
            user.save();
        }
    }
}
