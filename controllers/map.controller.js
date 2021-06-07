const { getAllLevels } = require("../services/map.service");

module.exports = {
    getLevels: async (req, res) => {
        try{
            let levels = await getAllLevels();
            if(levels.length == 0){
                res.writeHead(404, { 'Content-Type': 'application/json' })
                return res.end("Levels not found");
            }
            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(levels));
        }catch(err){
            console.log(err)
            res.writeHead(500, { 'Content-Type': 'application/json' })
            res.end("Levels: An error occured");
        }
    }
}