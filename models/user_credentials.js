const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;
var uuid = require('uuid-random');

const UsersCredentialsSchema = new Schema({
  // id: {
  //   type: uuid(),
  //   unique:true,
  //   required: true
  // },
  // username: {
  //   type: String,
  //   unique:true,
  //   required: true
  // },
  email: {
    type: String,
    unique:true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  // role: {
  //   type: String,
  //   enum:[ADMIN, USER],
  //   required: true
  // }
});

UsersCredentialsSchema.pre('save', async function (next) {
  try {
    /* 
    Here first checking if the document is new by using a helper of mongoose .isNew, therefore, this.isNew is true if document is new else false, and we only want to hash the password if its a new document, else  it will again hash the password if you save the document again by making some changes in other fields incase your document contains other fields.
    */
    if (this.isNew) {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(this.password, salt)
      this.password = hashedPassword
    }
    next()
  } catch (error) {
    next(error)
  }
})

UsersCredentialsSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password)
  } catch (error) {
    throw error
  }
}

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