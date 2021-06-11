const {UserData} = require("../models/user_data.js");
const {UserCredentials} = require("../models/user_credentials");
const { create } = require("../services/user.service.js");
const { getPostData} = require('../helpers/utils_fct');
const { stringify } = require("querystring");
var ObjectID = require('mongodb').ObjectID;
module.exports = {

   isAdmin: async (thePath) => {

        const user_id = thePath.substring(thePath.lastIndexOf('/') + 1);
        console.log("id " + user_id);
        const user = await UserCredentials.findOne({ id: user_id }).exec();
        console.log(user);
        if (!user){
           return false;
        }

        return true;

    },

    getUserById: async user_id => {
        const user = await UserCredentials.findOne({ id: user_id }).exec();
        if(user){
        return user;
        }
        else{
            return "not found";
        }
    },

    getAllUsers: async ()=>{
        let users = {}
        users = await UserCredentials.find({}).exec();
        return users;
    },

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
                
            res.writeHead(201, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(result))  
                // return res.status(200).json({
                //     success: 1,
                //     message: "user successfully created"
                // });
            });
        } catch (error) {
            console.log(error)
        }
    },

    findAndUpdateUser: async (req) => {
        
        let body = await getPostData(req)
        body = JSON.parse(body)
       // let user = getUserById(body.id);
       const user = await UserCredentials.findOne({ id: body.id }).exec();
        if(user){
            user.username = body.username;
            user.email = body.email;
            user.role = body.role;
            user.save();
            return user;
        }
        else{
            return "not found";
        } 
    },

    deleteUser:  async (user_id) =>{
    UserCredentials.findOneAndRemove({id: user_id});
    UserData.findOneAndRemove({id: user_id});
    }
    ,

    getUserDataById: async user_id => {
        const user = await UserData.findOne({ id: user_id }).exec();
        if(user){
            return user;
        }
        else{
            return "not found";
        }
    },

    getAllData: async ()=>{
        let data = {}
        data = await UserData.find({}).exec();
        return data;
    },

    findAndUpdateData: async (req) => {
        
        let body = await getPostData(req);
        body = JSON.parse(body)
       const data = await UserData.findOne({ id: body.id }).exec();
        if(data){
            data.current_level = body.current_level;
            if(body.coins){
            data.coins = body.coins;
            }
            if(body.xp){
            data.xp = body.xp;
            }
            data.save();
            return data;
        }
        else{
            return "not found";
        } 
    },





}
