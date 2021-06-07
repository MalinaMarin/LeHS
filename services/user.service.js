const {UserData} = require("../models/user_data.js");
const {UserCredentials} = require("../models/user_credentials.js");
const { v4: uuidv4} = require('uuid');

module.exports = {
    create: (data, callback) => {
        let user_credentials = new UserCredentials({
            id: uuidv4(),
            username: data.username,
            email: data.email,
            password: data.password,
            role: "USER"
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