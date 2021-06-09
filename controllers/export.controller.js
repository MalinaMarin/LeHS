const { exportPractice, exportLevels } = require("../services/export.service.js")
const http = require('http');

module.exports = {
    getPracticeQuestions: async (req, res) => {
        try{
            let practice= await exportPractice();
            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(practice));
        }catch(err){
            console.log(err);
            res.writeHead(500, { 'Content-Type': 'application/json' })
            res.end("An error occurred...")
        }
    },

    getLevels: async (req, res) => {
        try{
            let levels= await exportLevels();
            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(levels));
        }catch(err){
            console.log(err);
            res.writeHead(500, { 'Content-Type': 'application/json' })
            res.end("An error occurred...")
        }
    }

}