var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/', function(req, res, next) {		
    if(!req.session.token) {
        res.render('signup');
    }
    next();
});

router.post('/', function(req, res) {
    request.post({
        url: process.env.API_URL + '/user/createUser',
        form: req.body,
        json: true
    }, function(err, response, body) {
        if(err) {
            return res.render('signup', {msg: err.message});
        } else {
            if(body.message == 'User Created') {
                return res.redirect('login');
            } else {
                return res.render('signup', {error : body.message});
            }
        }
    });
});

module.exports = router;
