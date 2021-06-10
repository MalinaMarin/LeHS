const { getLevelData, submit, clickHint } = require("../services/play.service.js")
const http = require('http');


module.exports = {
    getLevel: async (level_id, res) => {
        try {
            console.log(level_id)
            let level = await getLevelData(level_id);
            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(level);
        }
        catch (err) {
            console.log(err);
            res.writeHead(500, { 'Content-Type': 'application/json' })
            res.end("An error occurred...")
        }
    },
    submitLevel: async (req, res) => {
        try {
            let body = await getPostData(req)
            body = JSON.parse(body);
            submit(body.level_id, body.user_id);
            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end("Great!");
            
        } catch (err) {
            console.log(err);
            res.writeHead(500, { 'Content-Type': 'application/json' })
            res.end("An error occurred...")
        }
    },

    clickOnHint: async (req, res) =>{
        try {
            let body = await getPostData(req)
            body = JSON.parse(body);
            await clickHint(body.user_id, body.coins);
            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end("Clicked!");
        }
        catch (err) {
            console.log(err);
            res.writeHead(500, { 'Content-Type': 'application/json' })
            res.end("An error occurred...")
        }
    }
}