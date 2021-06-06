const { getUserDataById } = require("../services/user.service.js")
const { checkAnswer } = require("../services/practice.service.js")
const { getPostData } = require('../helpers/utils_fct');
const http = require('http');

module.exports =
{
    submitAnswer: async (req, res) => {
        try {
            let body = await getPostData(req)
            body = JSON.parse(body)
            const user = getUserDataById(body.user_id);
            if (user==null) {
                res.writeHead(404, { 'Content-Type': 'application/json' })
                return res.end("Ooups...User not found!") 
            }
            const coins = checkAnswer(body.question_id, body.answer_value);
            if ( coins == null){
                res.writeHead(200, { 'Content-Type': 'application/json' })
                return res.end(coins) // Ooups..wrong answer! Try again"  
            }
            user.coins = user.coins + coins;
            user.practice_questions_solved.push(question_id);
            user.save(function(err){
                if(err){
                    console.log(err);
                    res.writeHead(500, { 'Content-Type': 'application/json' })
                    return res.end("An error occurred...")
                }
                else{
                    res.writeHead(200, { 'Content-Type': 'application/json' })
                    return res.end(JSON.stringify(user))  
                }
            });
        } catch (error) {
            console.log(error)
        }
    }
}