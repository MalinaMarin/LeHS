const { getLevelData, submit, clickHint } = require("../services/play.service.js")
const {getPostData} = require("../helpers/utils_fct.js")
const http = require('http');


module.exports = {
    getLevel: async (res, level_id) => {
        try {
            console.log(level_id);
            let level = await getLevelData(level_id);
            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(level));
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
            console.log(" bsandlas");
            console.log(body);
            await submit(body.level_id, body.user_id);
            console.log(" i wanna dieeee")
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