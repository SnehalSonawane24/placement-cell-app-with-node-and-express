const mongoose = require('mongoose');
const env = require('../config/environment');

// module.exports.db = async () => {
//     try{
//       await mongoose.connect(env.db)
//       console.log('connect to MongoDB sucessfully')
//     }catch(error){
//       console.timeLog('connect failed' +error.message)
//     }
//   }

// local mongodb connection
mongoose
    .connect(env.db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to database:: MongoDB');
    })
    .catch((error) => {
        console.error(console, "Error connecting to mongodb ==>>", error);
    });


const db = mongoose.connection;
db.on('error', console.error.bind(console, "Error connecting to mongodb"));

module.exports = db;
