const { Level } = require("../models/levels.js");
const { updateUserData } = require("./user.service.js");

module.exports = {
    getLevelData: async (level_id) => {
        const level = await Level.findOne({ id: level_id }).exec();
        return level;
    },

    clickHint: async (user_id, coins) => {
        await updateUserData("coins", user_id,coins);
    }
    // run: async (level, input) => {
    //     var source = await jsonReader(level.level_source);

    // }
}
