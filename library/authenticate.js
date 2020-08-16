var jwt = require('jsonwebtoken');
var { User } = require('../models/user');

function authenticateUser(req, res, next) {
    if(req.session.token) {
        jwt.verify(req.session.token, process.env.JWT_SECRET, function(err, decoded) {
            if(decoded) {
                User.findById(decoded.id, function(usrErr, usrRes) {
                    if(usrErr) {
                        console.log(usrErr);
                        res.redirect('/login');
                    } else {
                        req.usrObj = usrRes;
                        next();
                    }
                });
            } else {
                res.redirect('/login');
            }
        });
    } else {
        res.redirect('/login');
    }
}

module.exports = { authenticateUser };