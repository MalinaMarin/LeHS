const {getLevelData} = require("../services/play.service.js")

module.exports = {
    getLevel: async (level_id) => {
        return await getLevelData(level_id);
    }
}