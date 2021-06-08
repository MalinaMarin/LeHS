const {UserData} = require("../models/user_data.js");
const {Leaderboard} = require("../models/leaderboard.js");

module.exports ={

    getTop10: async () => {
        const user_array = await UserData.find().sort( { xp: -1 } ).limit(10).exec();
        return user_array;
    },
    refreshLedearboard: async xp => {
        const last = await Leaderboard.findOne({id:10}).exec();
        let leaderboard = await Leaderboard.find().exec();
        if(last.xp < xp){
            const array = await this.getTop10();
            for(let index =0; index<10;index++){
                leaderboard[index].player = array[index];
            }
        }
    },
    getLeaderboardService: async () => {
        const leaderboard = await Leaderboard.find().exec();
        return leaderboard;
    }
    
}