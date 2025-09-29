const mongoose = require('mongoose');
const dbconnection=()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('DB Connected!'));
  
};
module.exports = dbconnection