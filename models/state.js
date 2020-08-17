var mongoose = require('mongoose');
var autopopulate = require('mongoose-autopopulate');

var stateSchema = mongoose.Schema({
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

var employeeSchema = mongoose.Schema({
    state: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'state',
        autopopulate: {select: '-code -status -author'}
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
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
employeeSchema.plugin(autopopulate);

var State = mongoose.model('state', stateSchema, 'state');
var Employee = mongoose.model('employee', employeeSchema, 'employee');

module.exports = { State, Employee };