const {UserData} = require("../models/user_data.js");
const {UserCredentials} = require("../models/user_credentials.js");
const { v4: uuidv4} = require('uuid');
const fetch = require('node-fetch');
const { getPostData, parseCookies } = require('../helpers/utils_fct');
const localStorage = require('node-localstorage');
//var gitdata;
//var token = require('../server');
module.exports = {
    create: (data, callback) => {
        let user_credentials = new UserCredentials({
            id: uuidv4(),
            username: data.username,
            email: data.email,
            password: data.password,
            role: "USER",
            github_account: false
        });
        var user_data = new UserData({
            id: user_credentials.id,
            username: data.username,
            current_level: 1,
            coins: 0,
            xp: 0,
            practice_questions_solved: []
        });
        user_credentials.save(function (err) {
            if (err) {
                console.log(err)
                return callback(err);}
            user_data.save();
            return callback(null, user_data);
        });
    },

    // parseCookies: function (req) {
    //     var list = {},
    //       rc = req.headers.cookie;
      
    //     rc && rc.split(';').forEach(function (cookie) {
    //       var parts = cookie.split('=');
    //       list[parts.shift().trim()] = decodeURI(parts.join('='));
    //     });
      
    //     return list;
    //   },


    createGithub: (token, callback) => {
        //var access_token = token.access_token;
        //var currentToken = localStorage.getItem("token");
        console.log("token from create fct in service" + token);
        const options = {
            method: 'GET',
            headers: {
                
              Authorization: 'token ' + token
           },
   
          };

            fetch('https://api.github.com/user', options)
            .then(response => response.json())
            .then(data => {
                //console.log("TOKEN  " + token)
              //console.log(data.login);
               let user_credentials = new UserCredentials({
                id: uuidv4(),
                username: data.login,
                email: data.email,
                role: "USER",
                github_account: true
            });

            var user_data = new UserData({
            id: user_credentials.id,
            username: data.login,
            current_level: 1,
            coins: 0,
            xp: 0,
            practice_questions_solved: []
            });

            user_credentials.save(function (err) {
                if (err) {
                    console.log(err)
                    return callback(err);}
                user_data.save();
                return callback(null, user_data);
            });
            });

    },

    getUserDataById: async user_id => {
        const user = await UserData.findOne({ id: user_id }).exec();
        return user;
    },

    updateUserData : async (column_name, user_id, new_data) => {
        await UserData.findOne( {id: user_id}, function (err, doc){
            doc[column_name] = new_data;
            doc.save();
          });
    }
}

//exports.gitdata = gitdata;