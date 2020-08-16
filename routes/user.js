var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var router = express.Router();
var { User } = require('../models/user');
var { authenticateUser } = require('../library/authenticate');

router.post('/createUser', async function(req, res) {
    let user = await User.findOne({email: req.body.email});
    if(user) {
        res.json({
            message: 'Already Exist'
        });
    } else {
        bcrypt.genSalt(10, function(err, salt) {
            if(err) throw err;
            bcrypt.hash(req.body.password, salt,async function(err, hash) {
                if(err) throw err;
                req.body.password = hash;
                let user = new User(req.body);
                try {
                    await user.save();
                    res.json({
                        message: 'User Created'
                    });
                } catch(error) {
                    res.json({
                        message: 'User not created'
                    });
                }
            });
        });
    }
});

router.post('/authenticate', async function(req, res, next) {
    let user = await User.findOne({email: req.body.email});
    if(user) {
        bcrypt.compare(req.body.password, user.password, function(err, result) {
            if(err) throw err;
            if(result) {
                jwt.sign(
                    {id: user._id},
                    process.env.JWT_SECRET,
                    function(err, token) {
                        res.send({
                            message: 'User Found',
                            token: token
                        });
                    }
                )
            } else {
                res.send({
                    message: 'Wrong password'
                });
            }
        });
    } else {
        res.send({
            message: 'Email not found'
        })
    }
});

router.get('/loginUser', [authenticateUser], async function(req, res) {
    console.log('Inside service');
    res.status(200).json(req.usrObj);
});

module.exports = router;