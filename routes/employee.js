var express = require('express');
var router = express.Router();
var { authenticateUser } = require('../library/authenticate');
var { Employee } = require('../models/state');

router.get('/', [authenticateUser], async function(req, res) {
    let employees = await Employee.find({author: req.usrObj._id, status: true});
    res.status(200).json(employees);
});

router.get('/:id', [authenticateUser], async function(req, res) {
    let employee = await Employee.findById(req.params.id);
    res.status(200).json(employee);
});

router.post('/', [authenticateUser], async function(req, res) {
    req.body.author = req.usrObj._id;
    req.body.status = true;
    let employee = new Employee(req.body);
    try {
        await employee.save();
        res.status(200).json({
            message: 'Employee Created'
        });
    } catch(error) {
        res.status(503).json({
            message: 'Employee not created'
        });
    }
});

router.put('/:id', [authenticateUser], async function(req, res) {
    try {
        await Employee.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({
            message: 'Employee Updated'
        });
    } catch(error) {
        res.status(503).json({
            message: 'Employee not Updated'
        });
    }
});

router.delete('/:id', [authenticateUser], async function(req, res) {
    try {
        await Employee.findByIdAndUpdate(req.params.id, {status: false});
        res.status(200).json({
            message: 'Employee Deleted'
        });
    } catch(error) {
        res.status(503).json({
            message: 'Employee not Deleted'
        });
    }
});

module.exports = router;