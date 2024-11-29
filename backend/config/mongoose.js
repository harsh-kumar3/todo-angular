const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/tasks")
const db = mongoose.connection;

db.on('error', console.error.bind(console,"Error Connecting to Mongodb"))
db.once('open', function () {
    console.log("Connected to Mongodb successfully");
})

module.exports = db;