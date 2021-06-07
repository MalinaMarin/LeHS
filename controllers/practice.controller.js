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
            const user = await getUserDataById(body.user_id);
            if (user==null) {
                res.writeHead(404, { 'Content-Type': 'application/json' })
                return res.end("Ooups...User not found!") 
            }
            const coins = await checkAnswer(body.question_id, body.answer_value);
            // console.log(coins);
            // console.log(typeof coins);
            if(coins == -1){
                res.writeHead(500, { 'Content-Type': 'application/json' })
                return res.end("Error trying to parse the source")
            }
            else if ( coins==0){
                res.writeHead(200, { 'Content-Type': 'application/json' })
                return res.end(JSON.stringify(coins)) // Ooups..wrong answer! Try again"  
            }
            user.coins = user.coins + coins;
            // console.log(typeof user);
            // console.log(user);
            // console.log(typeof user.practice_questions_solved);
            // console.log(user.practice_questions_solved);
            console.log(typeof body.question_id);
            console.log(body.question_id);
            user.practice_questions_solved.push(body.question_id);
            console.log(user.coins);

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