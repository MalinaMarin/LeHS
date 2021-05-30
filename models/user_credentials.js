const mongoose = require("mongoose");

const Schema = mongoose.Schema;
var uuid = require('uuid-random');

const UsersCredentialsSchema = new Schema({
  id: {
    type: uuid(),
    unique:true,
    required: true
  },
  username: {
    type: String,
    unique:true,
    required: true
  },
  email: {
    type: String,
    unique:true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum:[ADMIN, USER],
    required: true
  }
});

const UserCredentials = mongoose.model('users_credentials', UsersCredentialsSchema);
module.exports = UserCredentials;


// mongoose.connect("mongodb+srv://admin:admin@lehs.df2yw.mongodb.net/leHSdb?retryWrites=true&w=majority", {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// 	useCreateIndex: true,
// 	useFindAndModify: false
// })


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://admin:admin@lehs.df2yw.mongodb.net/leHSdb?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("leHSdb").collection("users_credentials");
//   // perform actions on the collection object
  
//   client.close();
// });