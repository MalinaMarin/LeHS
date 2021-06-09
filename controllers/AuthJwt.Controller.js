const {verify, JsonWebTokenError} = require('jsonwebtoken');
const {hash, compare} = require('bcryptjs');
const { getPostData } = require('../helpers/utils_fct');
const { create, createGithub } = require("../services/user.service.js")

module.exports =
{
JwtRegister: async (req, res) => {
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
    //const {email, password} = req.body;
    
        //let user = fakeDB.find(user => user.email === email);
        //console.log(user);
        //if (user) throw new Error('User already exist');
        body.password = await hash(body.password,10);
        //console.log(hashPassword);

        create(body, (err, result) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' })
                return res.end("An error occurred...") 
                // return res.status(500).json({
                //     success: 0,
                //     message: "Database connection errror"
                // });
            }
            
        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(result))  
            // return res.status(200).json({
            //     success: 1,
            //     message: "user successfully created"
            // });
        });
  
    } catch(err) {
     console.log(err);
      
    }
  }
}