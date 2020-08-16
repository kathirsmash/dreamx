var express = require('express');
var router = express.Router();

router.use('/', function(req, res, next) {		
    if(req.path === '/signup') {
        return res.redirect('/signup');
    } else if(req.path !== '/login' && !req.session.token) {
        return res.redirect('/login');
    }
	next();
});

//make JWT token available to angular app
router.get('/token', function(req, res) {
	console.log('Inside /token - app controller: ' + req.session.token);
	res.send(req.session.token);
});

//serve angular app folder files from the '/app/' route
router.use('/', express.static('app'));

module.exports = router;
