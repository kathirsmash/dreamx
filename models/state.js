const mongoose = require('mongoose');

const stateSchema = mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    author : {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    }
});

const State = mongoose.model('state', stateSchema, 'state');

module.exports = { State };