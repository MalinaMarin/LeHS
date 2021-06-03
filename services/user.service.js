const UserData = require("../models/user_data.js");
const UserCredentials = require("../models/user_credentials.js");
module.exports = {
    create: (data, callback) => {
        var user_credentials = new UserCredentials({
            id: uuid(),
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
            xp: 0
        });
        user_credentials.save(function (err) {
            if (err) 
                return callback(err);
            user_data.save();
            return callback(null, user_data);
        });
    }
}