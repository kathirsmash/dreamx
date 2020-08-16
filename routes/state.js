var express = require('express');
var router = express.Router();
var { authenticateUser } = require('../library/authenticate');
var { State } = require('../models/state');

router.get('/', [authenticateUser], async function(req, res) {
    let states = await State.find({author: req.usrObj._id, status: true});
    res.status(200).json(states);
});

router.post('/', [authenticateUser], async function(req, res) {
    req.body.author = req.usrObj._id;
    req.body.status = true;
    let state = new State(req.body);
    try {
        await state.save();
        res.status(200).json({
            message: 'State Created'
        });
    } catch(error) {
        res.status(503).json({
            message: 'State not created'
        });
    }
});

router.put('/:id', [authenticateUser], async function(req, res) {
    try {
        await State.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({
            message: 'State Updated'
        });
    } catch(error) {
        res.status(503).json({
            message: 'State not Updated'
        });
    }
});

router.delete('/:id', [authenticateUser], async function(req, res) {
    try {
        await State.findByIdAndUpdate(req.params.id, {status: false});
        res.status(200).json({
            message: 'State Deleted'
        });
    } catch(error) {
        res.status(503).json({
            message: 'State not Deleted'
        });
    }
});

module.exports = router;