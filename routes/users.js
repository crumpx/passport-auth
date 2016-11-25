var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users/index');
});

router.get('/login', function(req, res){
	res.render('users/login.pug', { message: req.flash('loginMessage')});
});

router.post('/login', passport.authenticate('local-login', {
	successRedirect : 'dashboard',
	failureRedirect : 'login',
	failureFlash: true
}));

router.get('/signup', function(req, res){
	res.render('users/signup.pug', { message: req.flash('signupMessage')});
});

router.post('/signup', passport.authenticate('local-signup', {
	successRedirect : 'dashboard',
	failureRedirect : 'signup',
	failureFlash: true
}));

router.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});

router.get('/dashboard', isLoggedIn, function(req, res){
	res.render('users/dashboard.pug', {user: req.user});
});

router.get('/auth/facebook/', passport.authenticate('facebook', {scope: 'email'}));

router.get('/auth/facebook/callback',
	passport.authenticate('facebook',{
		successRedirect: '/users/dashboard',
		failureRedirect: '/'
	}));

router.get('/auth/twitter', passport.authenticate('twitter'));

router.get('/auth/twitter/callback', passport.authenticate('twitter', {
	successRedirect: '/users/dashboard',
	failureRedirect: '/'
}));

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email'] }));

router.get('/auth/google/callback', 
	passport.authenticate('google', {
		successRedirect: '/users/dashboard',
		failureRedirect: '/'
	}));

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}

module.exports = router;
