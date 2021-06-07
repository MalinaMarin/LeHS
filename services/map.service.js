const {Level} = require("../models/levels")

module.exports = {
    getAllLevels: async () =>{
        const levels = await Level.find().exec();
        return levels;
    }
}