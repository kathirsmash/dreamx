var express = require('express');
var router = express.Router();
var stateRouter = require('./state');
var employeeRouter = require('./employee');

router.use('/', function(req, res, next) {
    if(!req.session.token) {
        res.send({redirect: '/login'});
    } else {
        next();
    }
});

router.use('/state', stateRouter);
router.use('/employee', employeeRouter);

module.exports = router;
