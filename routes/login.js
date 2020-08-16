var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res) {
	req.session.destroy(function(err) {
		if(err) {
			console.log(err);
		} else {
			res.render('login');
		}
	});
});

router.post('/', function(req, res) {
	request.post({
		url: process.env.API_URL + '/user/authenticate',
		form: req.body,
		json: true
	}, function(error, response, body) {
		if(error) {
			return res.render('login', {error : 'An error occured'});
		}
		if(body.message != 'User Found') {
			return res.render('login', {error: body.message});
		}

		//Save JWT token in the session to make it available to angular app
		req.session.token = body.token;
		var returnUrl = req.query.returnUrl && decodeURIComponent(req.query.returnUrl) || '/';
		res.redirect(returnUrl);
	});
});

module.exports = router;