require('dotenv').config();
var config = module.exports;
const mongoose = require('mongoose');

mongoose.connect(process.env.DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
});