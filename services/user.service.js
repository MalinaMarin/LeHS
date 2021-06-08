const {UserData} = require("../models/user_data.js");
const {UserCredentials} = require("../models/user_credentials.js");
const { v4: uuidv4} = require('uuid');
const fetch = require('node-fetch');
var gitdata;
var access_token = require('../server');
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

    createGithub: (data, callback) => {
        let user_credentials = new UserCredentials({
            id: uuidv4(),
            username: data.username,
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

        const options = {
            method: 'GET',
            headers: {
              Authorization: 'token ' + access_token
           }
          };
          
            fetch('https://api.github.com/user', options)
            .then(response => response.json())
            .then(data => {
              console.log(data.login)
               gitdata = JSON.stringify({
               'username': data.login,
               'email': data.email
            })
            console.log(gitdata);
          
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

exports.gitdata = gitdata;