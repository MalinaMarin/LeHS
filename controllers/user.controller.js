const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { create } = require("../services/user.service.js")
const { getPostData } = require('../helpers/utils_fct');
const http = require('http');

module.exports =
{
    createUser: async (req, res) => {
        // const body = req.body;
        try {
            let body = await getPostData(req)
            body = JSON.parse(body)
            if (body.password != body.confirmPassword) {
                res.writeHead(500, { 'Content-Type': 'application/json' })
                return res.end("passwords don't match") 
                // return res.status(500).json({
                //     success: 0,
                //     message: "passwords don't match"
                // });
            }
            const salt = genSaltSync(10);
            console.log(body.password)
            body.password = hashSync(body.password, salt);
            create(body, (err, result) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' })
                    return res.end("An error occurred...") 
                    // return res.status(500).json({
                    //     success: 0,
                    //     message: "Database connection errror"
                    // });
                }
                
            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(result))  
                // return res.status(200).json({
                //     success: 1,
                //     message: "user successfully created"
                // });
            });
        } catch (error) {
            console.log(error)
        }
    }
}