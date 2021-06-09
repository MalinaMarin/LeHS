const {UserData} = require("../models/user_data.js");
const {UserCredentials} = require("../models/user_credentials.js");
const { v4: uuidv4} = require('uuid');
const fetch = require('node-fetch');
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

    parseCookies: function (req) {
        var list = {},
          rc = req.headers.cookie;
      
        rc && rc.split(';').forEach(function (cookie) {
          var parts = cookie.split('=');
          list[parts.shift().trim()] = decodeURI(parts.join('='));
        });
      
        return list;
      },


    createGithub: (access_token, callback) => {
        //var access_token = token.access_token;
        //var currentToken = localStorage.getItem("token");

       // const token = parseCookies(req).token;

        const options = {
            method: 'GET',
            headers: {
                
              Authorization: 'token ' + access_token
           },
           credentials: "include"
          };
            fetch('https://api.github.com/user', options)
            .then(response => response.json())
            .then(data => {
                console.log("TOKEN  " + currentToken)
              //console.log(data.login);
              let gitdata = JSON.stringify({
                'username': data.login,
                'email': data.email
             })
             console.log(gitdata);
               let user_credentials = new UserCredentials({
                id: uuidv4(),
                username: data.login,
                email: data.email,
                role: "USER",
                github_account: true
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
            });

    },

    getUserDataById: async user_id => {
        const user = await UserData.findOne({ id: user_id }).exec();
        return user;
    },

    updateUserData : (column_name, current, new_data) => {
        UserData.findOne( {[column_name]: current}, function (err, doc){
            doc[column_name] = new_data;
            doc.save();
          });
    }
}

//exports.gitdata = gitdata;