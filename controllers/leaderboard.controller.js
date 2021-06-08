const { getLeaderboardService } = require("../services/leaderboard.service.js")
const http = require('http');

module.exports = {
    getLeaderboard: async (req, res) => {
        try{
            let leaderboard = await getLeaderboardService();
            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(leaderboard));
        }catch(err){
            console.log(err);
            res.writeHead(500, { 'Content-Type': 'application/json' })
            res.end("An error occurred...")
        }
    }
}