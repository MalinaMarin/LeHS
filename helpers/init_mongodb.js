
//Import the mongoose module
var mongoose = require('mongoose');
Promise = global.Promise
const url = "mongodb://localhost:5000"


//Set up default mongoose connection
var mongoDB = 'mongodb://localhost';
//connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
//var db = connection;

//Bind connection to error event (to get notification of connection errors)
//db.on('error', console.error.bind(console, 'MongoDB connection error:'));

mongoose
  .connect(mongoDB, {
    dbName: process.env.DB_NAME,
   // dbName: 'LeHS',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })

  .then(() => {
    console.log('mongodb connected.')
  })
   .catch((err) => console.log(err.message))

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to db')
})

mongoose.connection.on('error', (err) => {
  console.log(err.message)
})

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection is disconnected.')
})

process.on('SIGINT', async () => {
  await mongoose.connection.close()
  process.exit(0)
})


//export default mongoose;