require('dotenv').config();
var express = require('express');
var path = require('path');
var session = require('express-session');
var expressJwt = require('express-jwt');
var config = require('./config');

var appRouter = require('./routes/app');
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var userRouter = require('./routes/user');
var apiRouter = require('./routes/api');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({secret: process.env.JWT_SECRET, name: 'sessionID', resave: true, saveUninitialized: true, rolling: true, cookie: {secure: false, maxAge: 100*100*100*18}}));

app.use('/api', expressJwt({secret: process.env.JWT_SECRET}).unless({path: ['/api/user/createUser', '/api/user/authenticate']}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/app', appRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/api/user', userRouter);
app.use('/api', apiRouter);

//Redirect to app controller
app.get('/', function(req,res) {
	return res.redirect('/app');
});

app.listen(5000, function() {
    console.log('Server listening at port 5000');
});